<template>
  <div :id="randomId" :style="{ width, height }"></div>
</template>
<script>
import { defaultCfg } from "./chartLineCfg";
export default {
  name: "ChartLine",
  props: {
    cfg: {
      type: Object,
      default: null,
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  computed: {
    randomId() {
      return "chartLine" + new Date().getTime();
    },
  },
  data() {
    return {
      width: "100%",
      chartLine: null,
      defaultCfg,
      option: {},
      resizeTimer: null,
    };
  },
  mounted() {
    this.option =
      this.cfg && Object.keys(this.cfg).length ? this.cfg : this.defaultCfg;
    this.width = this.$parent.$el.offsetWidth + "px";

    this.init();
    // 窗口变化重绘echart
    window.addEventListener("resize", () => {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }
      this.resizeTimer = setTimeout(function () {
        this.chartLine && this.chartLine.resize();
      }, 100);
    });
  },
  methods: {
    // 可供ref外部调用
    resizeChart() {
      this.width = this.$parent.$el.offsetWidth + "px";
      this.$nextTick(() => {
        this.chartLine.resize();
      });
    },
    // 初始化
    init() {
      if (this.chartLine) this.chartLine = null;
      this.chartLine = this.$echarts.init(
        document.getElementById(this.randomId)
      );
      this.chartLine.setOption(this.option);
    },
  },
  watch: {
    cfg: {
      deep: true,
      handler(cfg) {
        this.option = cfg;
        this.chartLine.setOption(this.option);
      },
    },
  },
  beforeDestroy() {
    /* 页面组件销毁的时候，移除绑定的监听resize事件*/
    window.removeEventListener("resize", () => {
      this.chartLine.resize();
    });
  },
};
</script>
<style lang="less" scoped>
.chart-title {
  background: #ccc;
}
</style>
