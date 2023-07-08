<template>
  <div class="wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
// 文档地址：https://x6.antv.antgroup.com/tutorial/basic/graph
import { Graph } from "@antv/x6";
import dagre from "dagre";
import { box_width, box_height } from "./config";
// 布局方向
const dir = "TB"; // LR RL TB BT
export default {
  name: "x6",
  data() {
    return {
      graphRef: null,
      nodes: [],
      edges: [],
    };
  },
  created() {
    this.getTreeData();
  },
  mounted() {
    // 创建画布
    const box = document.getElementsByClassName("wrapper")[0];
    this.graphRef = new Graph({
      container: document.getElementById("container"),
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
                    r: 4,
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
                    r: 4,
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
        // return this.graphRef.createEdge({
        //   shape: type,
        //   source: { cell: source.id, port: "rightOut" },
        //   target: { cell: target.id, port: "leftIn" },
        // });
        return this.graphRef.createEdge({
          shape: type,
          source: { cell: source.id },
          target: { cell: target.id },
          router: {
            name: "er",
            args: {
              offset: 24,
              direction: "L",
            },
          },
        });
      }
      //   return this.graphRef.createEdge({
      //     shape: type,
      //     source: { cell: source.id },
      //     target: { cell: target.id },
      //   });
    },

    // 自动布局
    layout() {
      const nodes = this.graphRef.getNodes();
      const edges = this.graphRef.getEdges();
      const g = new dagre.graphlib.Graph();
      g.setGraph({ rankdir: dir, nodesep: 10, ranksep: 40 });
      g.setGraph({});
      /**
       * ankdir: 图的布局方向，可以是"TB"（从上到下，默认）、"BT"（从下到上）、"LR"（从左到右）或"RL"（从右到左）。
       * nodesep: 节点之间的水平间距。
       * edgesep: 边之间的水平间距。
       * ranksep: 同一层级节点之间的垂直间距。
       * marginx: 图的水平边距。
       * marginy: 图的垂直边距。
       */

      g.setDefaultEdgeLabel(() => ({}));

      //   const width = 260;
      //   const height = 90;
      const width = box_width;
      const height = box_height;
      nodes.forEach((node) => {
        const { depth } = node.data;
        console.log(depth);
        g.setNode(node.id, { width, height, rank: depth });
        // setNode(id, label)添加一个节点到图中。id是节点的唯一标识符，label是节点的属性对象。
      });

      edges.forEach((edge) => {
        const source = edge.getSource(); // 获取边的起始节点/起始点信息。
        const target = edge.getTarget(); // 获取边的终止节点/终止点信息。
        g.setEdge(source.cell, target.cell);
        // setEdge(v, w, label)添加一条边到图中。v是边的起始节点标识符，w是边的结束节点标识符，label是边的属性对象
      });

      dagre.layout(g); // 该函数用于对输入的图进行布局。graph是

      // 获取图中所有节点的标识符。
      g.nodes().forEach((id) => {
        const node = this.graphRef.getCellById(id); // 根据节点/边的 ID 获取节点/边。
        if (node) {
          const pos = g.node(id); // 获取指定标识符的节点的属性
          node.position(pos.x, pos.y); // 根据layout算法算的坐标值渲染到X6中
        }
      });
      //   edges.forEach((edge) => {
      //     const source = edge.getSourceNode(); // 获取边的起始节点，没有连接到节点时返回 null。
      //     const target = edge.getTargetNode(); // 获取边的终止节点，没有连接到节点时返回 null。
      //     const sourceBBox = source.getBBox(); // getBBox 返回边的包围盒。
      //     const targetBBox = target.getBBox();
      //     if ((dir === "LR" || dir === "RL") && sourceBBox.y !== targetBBox.y) {
      //       const gap =
      //         dir === "LR"
      //           ? targetBBox.x - sourceBBox.x - sourceBBox.width
      //           : -sourceBBox.x + targetBBox.x + targetBBox.width;
      //       const fix = dir === "LR" ? sourceBBox.width : 0;
      //       const x = sourceBBox.x + fix + gap / 2;
      //       edge.setVertices([
      //         { x, y: sourceBBox.center.y },
      //         { x, y: targetBBox.center.y },
      //       ]);
      //     } else if (
      //       (dir === "TB" || dir === "BT") &&
      //       sourceBBox.x !== targetBBox.x
      //     ) {
      //       const gap =
      //         dir === "TB"
      //           ? targetBBox.y - sourceBBox.y - sourceBBox.height
      //           : -sourceBBox.y + targetBBox.y + targetBBox.height;
      //       const fix = dir === "TB" ? sourceBBox.height : 0;
      //       const y = sourceBBox.y + fix + gap / 2;

      //       edge.setVertices([
      //         { x: sourceBBox.center.x, y },
      //         { x: targetBBox.center.x, y },
      //       ]);
      //       //   if (edge.shape != "spouse") {
      //       //     edge.setVertices([
      //       //       { x: sourceBBox.center.x, y },
      //       //       { x: targetBBox.center.x, y },
      //       //     ]);
      //       //   } else {
      //       //     // 夫妻
      //       //     edge.setVertices([
      //       //       { x, y: sourceBBox.center.y },
      //       //       { x, y: targetBBox.center.y },
      //       //     ]);
      //       //   }
      //     } else {
      //       edge.setVertices([]); // 如果不设置，此处为锐利的斜线
      //     }
      //   });
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
            const { parents, sex, spouses } = node.data;
            // const { parents } = node.data;
            if (parents.length) {
              const parentId = parents[0];
              const parent = this.nodes.find((v) => v.data.id == parentId);
              const line = this.createEdge(parent, node);
              this.edges.push(line);
            }
            if (sex == "f" && spouses.length) {
              const husbandId = spouses[0];
              const husband = this.nodes.find((v) => v.data.id == husbandId);
              const line = this.createEdge(node, husband, "spouse");
              this.edges.push(line);
            }
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
