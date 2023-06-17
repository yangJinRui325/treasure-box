<template>
  <div class="wrapper">
    <div id="container"></div>
  </div>
</template>

<script>
// 文档地址：https://x6.antv.antgroup.com/tutorial/basic/graph
import { Graph } from "@antv/x6";

export default {
  name: "x6",
  data() {
    return {
      graphRef: null,
    };
  },
  created() {},
  mounted() {
    this.graphRef = new Graph({
      container: document.getElementById("container"),
      width: 800,
      height: 600,
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
    this.addNode();
  },
  methods: {
    // 自定义定制节点
    registerNode() {
      Graph.registerNode(
        "people-node",
        {
          inherit: "rect", // 继承于 rect 节点
          width: 74,
          height: 92,
          markup: [
            {
              tagName: "rect", // 标签名称
              selector: "p-box", // 选择器
            },
            {
              tagName: "image",
              selector: "p-headImg",
            },
            {
              tagName: "text",
              selector: "p-name",
            },
          ],
          attrs: {
            "p-box": {
              refWidth: "100%",
              refHeight: "100%",
              stroke: "transparent",
              strokeWidth: 0,
              fill: "#fff",
              rx: 6,
              ry: 6,
            },
            "p-headImg": {
              "xlink:href": "https://i.postimg.cc/Twh5QD9f/p-man.png",
              width: 50,
              height: 50,
              x: 12,
              y: 12,
            },
            "p-name": {
              refX: 0.5,
              refY: 0.86,
              fill: "#000",
              fontFamily: "PingFangSC-Semibold, PingFang SC",
              fontSize: 14,
              fontWeight: "800",
            },
          },
        },
        true
      );
    },
    // 根据参数添加节点
    addNode(name = "未知", sex = 1, isDie = false) {
      let headImg = "";
      if (sex == 0) {
        headImg = isDie
          ? "https://i.postimg.cc/fLFtPR2X/p-man-death.png"
          : "https://i.postimg.cc/Twh5QD9f/p-man.png";
      } else {
        headImg = isDie
          ? "https://i.postimg.cc/fLFtPR2X/p-man-death.png"
          : "https://i.postimg.cc/4y97RRq0/p-woman.png";
      }
      const node = this.graphRef.addNode({
        shape: "people-node", // 可以直接使用上面注册过的 shape
        x: 40,
        y: 40,
        attrs: {
          "p-headImg": {
            "xlink:href": headImg,
          },
          "p-name": {
            text: name,
          },
        },
      });
      console.log(node.prop());
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
}
.x6-node .p-name {
  text-align: center;
  color: red;
}
</style>
