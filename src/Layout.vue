<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header">
      <h2 class="title">图表拖拽示例</h2>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <sider-left />
      <Content />
    </a-layout-content>
  </a-layout>
</template>
<script>
import SiderLeft from "@/views/SiderLeft.vue";
import Content from "@/views/Content";
export default {
  name: "Layout",
  props: {},
  components: { SiderLeft, Content },
  computed: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  .layout-header {
    color: #fff;
    .title {
      margin: 0;
      color: #fff;
    }
  }
  .layout-content {
    display: grid;
    grid-template-columns: 340px auto;
  }
}
</style>
