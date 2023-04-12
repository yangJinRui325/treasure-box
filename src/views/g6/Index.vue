<template>
  <div class="tree-wrapper" ref="treeBox">
    <div id="container"></div>
  </div>
</template>

<script>
import Vue from "vue";
import domNode from "./components/dom-node.vue";
import G6 from "@antv/g6";
export default {
  name: "App",
  data() {
    return {
      TuGraph: null,
      fontSize: 16,
      Vue: Vue,
      renderData: {},
    };
  },
  created() {
    this.getTreeList();
  },
  mounted() {
    const wraperWidth = this.$refs.treeBox.clientWidth;
    const wraperHeight = this.$refs.treeBox.clientHeight;
    G6.registerNode(
      "dom-node",
      {
        draw: (cfg, group) => {
          const dom = group.addShape("dom", {
            attrs: this.createHtml(cfg),
            draggable: true,
          });
          const hasChildren = cfg.children && cfg.children.length > 0;
          if (hasChildren) {
            this.createMaker(cfg, group);
          } else {
            // 原始库不写下级 没有子集 默认收缩
            if (cfg.catalogType !== 1) {
              cfg.collapsed = true;
              this.createMaker(cfg, group);
            }
          }
          return dom;
        },
        update: (cfg, item) => {
          const group = item.getContainer();
          const icon = group.find((e) => e.get("name") === "collapse-icon");
          if (!icon) return;
          icon.attr(
            "symbol",
            cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse
          );
        },
      },
      "single-node"
    );

    this.TuGraph = new G6.TreeGraph({
      container: "container",
      width: wraperWidth,
      height: wraperHeight,
      fitView: false,
      renderer: "svg",
      modes: {
        default: [
          {
            type: "collapse-expand",
            onChange: (item, collapsed) => {
              const data = item.get("model");
              this.TuGraph.updateItem(item, {
                collapsed,
              });
              data.collapsed = collapsed;
              return true;
            },
          },
          "drag-canvas",
          "zoom-canvas",
        ],
      },
      defaultNode: {
        type: "dom-node",
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: "polyline",
        style: {
          stroke: "#1890ff",
          // offset: 20,  // 拐弯处距离节点最小距离
          radius: 20, // 拐弯处的圆角弧度，若不设置则为直角
          lineWidth: 2,
        },
      },
      layout: {
        type: "compactBox", // compactBox
        direction: "H",
        getHeight: (cfg) => {
          const { boxHeight } = this.handleWidth(cfg);
          return boxHeight;
        },
        getWidth: (cfg) => {
          const { boxWidth } = this.handleWidth(cfg);
          return boxWidth;
        },
        getVGap: function getVGap() {
          return 30;
        },
        getHGap: function getHGap() {
          return 40;
        },
        getSide: function getSide(d) {
          return d.data.name === "基本数据库" ? "left" : "right";
        },
      },
    });
  },
  methods: {
    getTreeList() {
      this.$axios.get("/getTreeBase").then((res) => {
        console.log(res);
        this.renderData = res;
        this.initTree();
      });
    },
    initTree() {
      this.TuGraph.data(this.renderData);
      this.TuGraph.render();

      const centerItem = this.TuGraph.findById("root");
      // const { x, y } = centerItem.getModel()
      // this.TuGraph.zoom(2.4, { x: x, y: y })
      this.TuGraph.focusItem(centerItem);

      // 监听点击事件
      this.TuGraph.on("collapse-icon:click", (e) => {
        const target = e.target;
        const id = target.get("modelId");
        const item = this.TuGraph.findById(id);
        const nodeModel = item.getModel();
        const children = nodeModel.children;
        if (!children || children.length === 0) {
          this.TuGraph.set("animate", false);
          this.$axios.get("/getTreeData").then((res) => {
            let list = [];
            const childData = res.children;
            list = [...childData];
            setTimeout(() => {
              this.TuGraph.updateItem(item, {
                collapsed: !nodeModel.collapsed,
              });
              this.TuGraph.updateChildren(list, id);
              this.TuGraph.focusItem(item);
            }, 100);
          });
        }
      });

      const container = document.getElementById("container");
      container.onclick = (e) => {
        if (e.target.nodeName === "svg") return;
        let catalogNode;
        function findCatalogNode(target) {
          if (target.nodeName === "svg") return;
          if ([].indexOf.call(target.classList, "catalog-node") !== -1) {
            catalogNode = target;
          } else {
            findCatalogNode(target.parentNode);
          }
        }
        findCatalogNode(e.target);
        // // 如果已删除，则点击事件无效
        // if (catalogNode && catalogNode.classList.contains('is-deleted')) return
        if (!catalogNode || !catalogNode.id) return;
        const catalogId = catalogNode.id ? catalogNode.id : "";
        const attrData = catalogNode.getAttribute("attrData")
          ? catalogNode.getAttribute("attrData")
          : "";
        const [name, id, catalogType, depth] = attrData.split("-");
        if (!depth || depth >= 3) {
          return;
        }
        if (catalogId) {
          if (catalogType === "0" || catalogType === "1") {
            this.$router.push({
              path: "/knowledge/index/originalLibrary",
              query: {
                id: catalogId,
                type: catalogType,
                name: name,
              },
            });
          } else if (catalogType === "2" || catalogType === "3") {
            this.$router.push({
              path: "/knowledge/index/baseLibrary",
              query: {
                id: id,
                type: catalogType,
              },
            });
          }
        }
      };
    },
    handleDom(type, id, name, attrData, count) {
      const NodeComponent = Vue.extend({
        render: (h) =>
          h(domNode, {
            props: {
              type,
              id,
              name,
              attrData,
              count,
            }, // 组件传值
          }),
      }); // 生成组件的dom
      const component = new NodeComponent().$mount();
      const DomContent = component.$el.innerHTML; // 将vue结构转化成dom
      return DomContent;
    },
    // 计算宽
    handleWidth(cfg, fontSize = 16) {
      const { name, count, depth } = cfg;
      const num = name.length >= 12 ? 12 : name.length;
      const countNum = count === 0 ? 28 : count.toString().length * 12 + 16;
      const shapeWidth = num * fontSize + countNum + 16;
      const shapeHeight = name.length >= 12 ? 64 : 42;
      const boxWidth = depth < 2 ? 160 : shapeWidth + 20;
      const boxHeight = depth < 2 ? 60 : shapeHeight;
      return { boxWidth, boxHeight, shapeWidth, shapeHeight };
    },
    createHtml(cfg) {
      const { id, name, count, depth, catalogType } = cfg;
      const { boxWidth, boxHeight } = this.handleWidth(cfg);
      cfg.width = boxWidth;
      cfg.height = boxHeight;
      const domCfg = {
        width: boxWidth,
        height: boxHeight,
      };
      const attrData = `${name}-${id}-${catalogType}-${depth}`;
      if (depth === 0) {
        domCfg.html = this.handleDom("1", id, name, attrData);
      } else if (depth === 1) {
        domCfg.html = this.handleDom("2", id, name, attrData, count);
      } else {
        domCfg.html = this.handleDom("3", id, name, attrData, count);
      }
      return domCfg;
    },
    createMaker(cfg, group) {
      const { name, depth, height } = cfg;
      const markerCfg = {
        y: height / 2,
        r: 8.5,
        symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
        fill: "#fff",
        stroke: "#1890ff",
        lineWidth: 1,
      };
      if (depth === 0) {
        group.addShape("marker", {
          attrs: {
            ...markerCfg,
            x: cfg.width,
          },
          modelId: cfg.id,
          name: "collapse-icon",
        });
      } else {
        group.addShape("marker", {
          attrs: {
            ...markerCfg,
            x: name === "基本数据库" ? 10 : cfg.width + 10,
          },
          modelId: cfg.id,
          name: "collapse-icon",
        });
      }
    },
  },
};
</script>

<style>
.tree-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f5f5f5;
}

#container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
