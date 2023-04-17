<template>
  <div class="chart-container">
    <sider-left />
    <Content />
  </div>
</template>
<script>
import SiderLeft from "@/views/chart/SiderLeft.vue";
import Content from "@/views/chart/Content.vue";
export default {
  name: "Index",
  props: {},
  computed: {},
  components: { SiderLeft, Content },
  data() {
    return {};
  },
  mounted() {
    this.$message.info({
      content: "将左侧图表拖拽至中间，打开右侧进行配置",
      closeBtn: true,
      duration: 0,
      offset: [0, 60],
      // 层级控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
      zIndex: 1001,
      // 挂载元素控制：非当前场景自由控制开关的关键代码，仅用于测试 API 是否运行正常
      attach: document.body,
    });
  },
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 340px auto;
}
</style>
