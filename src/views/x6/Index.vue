<template>
  <div class="wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
// 文档地址：https://x6.antv.antgroup.com/tutorial/basic/graph
import { Graph } from "@antv/x6";
// import dagre from "dagre";
import {
  box_width,
  box_height,
  //   verticalMargin,
  //   horizontalMargin,
} from "./config";
// 布局方向
// const dir = "TB"; // LR RL TB BT
export default {
  name: "x6",
  data() {
    return {
      graphRef: null,
      nodes: [],
      edges: [],
      boxSize: [0, 0],
    };
  },
  created() {
    this.getTreeData();
  },
  mounted() {
    // 创建画布
    const box = document.getElementsByClassName("wrapper")[0];
    const canvasEl = document.getElementById("container");
    this.boxSize = [box.clientWidth, box.clientHeight];
    this.graphRef = new Graph({
      container: canvasEl,
      width: box.clientWidth,
      height: box.clientHeight,
      // 背景也可以填充图片
      background: {
        color: "#F2F7FA",
      },
      // 网格线
      grid: {
        visible: true,
        type: "doubleMesh",
        args: [
          {
            color: "#eee", // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: "#ddd", // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      //平移
      panning: true,
      // 缩放
      mousewheel: true,
    });

    this.registerNode();
    this.registerEdge();
  },
  methods: {
    // 自定义定制节点
    registerNode() {
      Graph.registerNode(
        "people-node",
        {
          inherit: "rect", // 继承于 rect 节点
          width: box_width,
          height: box_height,
          markup: [
            {
              tagName: "rect", // 标签名称
              selector: "p_box", // 选择器
            },
            {
              tagName: "image",
              selector: "p_headImg",
            },
            {
              tagName: "text",
              selector: "p_name",
            },
          ],
          attrs: {
            p_box: {
              refWidth: "100%",
              refHeight: "100%",
              stroke: "transparent",
              strokeWidth: 0,
              fill: "#fff",
              rx: 6,
              ry: 6,
            },
            p_headImg: {
              "xlink:href": "https://i.postimg.cc/Twh5QD9f/p-man.png",
              width: 50,
              height: 50,
              x: 12,
              y: 12,
            },
            p_name: {
              refX: 0.5,
              refY: 0.86,
              fill: "#000",
              fontFamily: "PingFangSC-Semibold, PingFang SC",
              fontSize: 14,
              fontWeight: "800",
            },
          },
          // 连接桩
          ports: {
            items: [
              { group: "in", id: "leftIn" },
              { group: "out", id: "rightOut" },
            ],
            groups: {
              in: {
                position: { name: "left" },
                attrs: {
                  circle: {
                    magnet: true,
                    r: 1,
                    stroke: "#31d0c6",
                    fill: "#fff",
                    strokeWidth: 1,
                  },
                },
                zIndex: 1,
              },
              out: {
                position: { name: "right" },
                attrs: {
                  circle: {
                    magnet: true,
                    r: 1,
                    stroke: "#31d0c6",
                    fill: "#fff",
                    strokeWidth: 1,
                  },
                },
                zIndex: 1,
              },
            },
          },
        },
        false
      );
    },
    // 自定义边
    registerEdge() {
      Graph.registerEdge(
        "parenting",
        {
          zIndex: -1,
          attrs: {
            line: {
              strokeWidth: 2,
              stroke: "#A2B1C3",
              sourceMarker: null,
              targetMarker: null,
            },
          },
        },
        false
      );
      // 组合
      Graph.registerEdge(
        "spouse",
        {
          inherit: "edge",
          attrs: {
            line: {
              strokeWidth: 1,
              sourceMarker: {
                name: "path",
                d: "M 30 10 L 20 16 L 10 10 L 20 4 z",
                fill: "black",
                offsetX: -10,
              },
              targetMarker: {
                name: "path",
                d: "M 6 10 L 18 4 C 14.3333 6 10.6667 8 7 10 L 18 16 z",
                fill: "black",
                offsetX: -5,
              },
            },
          },
        },
        false
      );
    },

    // 根据参数添加节点
    createNode(data, name = "未知", sex = "m", isDie = false) {
      let headImg = "";
      if (sex == "m") {
        headImg = isDie
          ? "https://i.postimg.cc/fLFtPR2X/p-man-death.png"
          : "https://i.postimg.cc/Twh5QD9f/p-man.png";
      } else {
        headImg = isDie
          ? "https://i.postimg.cc/3ry6ZBZn/p-woman-death.png"
          : "https://i.postimg.cc/4y97RRq0/p-woman.png";
      }
      return this.graphRef.createNode({
        data: data,
        shape: "people-node", // 可以直接使用上面注册过的 shape
        x: 40,
        y: 40,
        attrs: {
          p_headImg: {
            "xlink:href": headImg,
          },
          p_name: {
            text: name,
          },
        },
      });
    },
    // 创建边
    createEdge(source, target, type = "parenting") {
      if (type === "parenting") {
        return this.graphRef.createEdge({
          shape: type,
          source: { cell: source.id },
          target: { cell: target.id },
        });
      } else {
        return this.graphRef.createEdge({
          shape: type,
          source: { cell: source.id, port: "rightOut" },
          target: { cell: target.id, port: "leftIn" },
        });
      }
    },

    // 自动布局
    layout() {
      /** 算法
       * 1、层级 可以通过depth
       * 2、夫妻关系，
       * 3、计算出当前代数中最多的人员
       */
      //   const nodes = this.graphRef.getNodes();
      //   const edges = this.graphRef.getEdges();
      //   console.log(nodes, edges);
      //   this.handleGenMaxNum(nodes);
      //   const { gens, gens_total } = this.handleGenMaxNum(nodes);
      //   const [posX] = this.boxSize;
      //   const gap_columns = Math.floor(posX / (gens_total + 2));
      //   console.log(gap_columns);
      //   nodes.forEach((node) => {
      //     const { depth, id } = node.data;
      //     const [len, idx] = this.handleDepthNumber(depth, id);
      //     const pos_X =
      //     node.position(pos_X, pos_Y);
      //   });
      //   const [posX] = this.boxSize;
      //   const nodes = this.graphRef.getNodes();
      //   const edges = this.graphRef.getEdges();
      //   console.log(nodes, edges);
      //   nodes.forEach((node) => {
      //     const { depth, id } = node.data;
      //     const [len, idx] = this.handleDepthNumber(depth, id);
      //     const gridX = posX / (len + 1);
      //     const pos_X = gridX + (gridX + horizontalMargin) * idx - box_width / 2;
      //     const pos_Y = box_height * depth + verticalMargin;
      //     console.log(posX, pos_X);
      //     node.position(pos_X, pos_Y);
      //     /*
      //      * boxw = 200
      //      * box_width = 74
      //      *
      //      */
      //     // console.log(node.position());
      //     // if (depth == 1) {
      //     //   node.position(posX / 2, 100);
      //     // } else if (depth == 2) {
      //     //   node.position(
      //     //     posX / 2,
      //     //     100 + verticalMargin * (depth - 1) + box_height
      //     //   );
      //     // }
      //     // setNode(id, label)添加一个节点到图中。id是节点的唯一标识符，label是节点的属性对象。
      //   });
    },
    // 当前人员是他平辈的第几个
    handleDepthNumber(depth, id) {
      const curDepthList = this.nodes.filter(
        (node) => node.data.depth == depth
      );
      const idx = curDepthList.findIndex((node) => node.data.id == id);
      return [curDepthList.length, idx];
    },
    // 计算x代中最多一代的人数
    handleGenMaxNum(nodes) {
      let gens = null; //出现次数最多的代数
      let gens_total = 1; //该元素出现次数
      nodes.reduce((p, cur) => {
        //对该数组进行reduce遍历
        let k = cur.data.depth;
        p[k] ? p[k]++ : (p[k] = 1); //k代表当前正在遍历的元素。应用到p[k]里，k表示p对象里的一个键，p[k]表示该键对应的值。不懂的话用如下图对象测一下就懂了
        if (p[k] > gens_total) {
          gens_total = p[k];
          gens = k;
        }
        return p; //最后返回一个对象
      }, {});
      return { gens: gens, gens_total: gens_total };
    },

    //获取家谱数据
    getTreeData() {
      this.$axios
        .get("/getZupuTreeData?rootIndividualId=5146&showNum=5")
        .then((res) => {
          res.forEach((element) => {
            const { name, sex, alive } = element;
            this.nodes.push(this.createNode(element, name, sex, alive == 0));
          });
          this.nodes.forEach((node) => {
            // const { parents, sex, spouses } = node.data;
            const { parents } = node.data;
            if (parents.length) {
              const parentId = parents[0];
              const parent = this.nodes.find((v) => v.data.id == parentId);
              const line = this.createEdge(parent, node);
              this.edges.push(line);
            }
            // if (sex == "f" && spouses.length) {
            //   const husbandId = spouses[0];
            //   const husband = this.nodes.find((v) => v.data.id == husbandId);
            //   const line = this.createEdge(husband, node, "spouse");
            //   this.edges.push(line);
            // }
          });
          this.graphRef.resetCells([...this.nodes, ...this.edges]);
          this.layout();
        });
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
}
.x6-node .p_name {
  text-align: center;
  color: red;
}
</style>
