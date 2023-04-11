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
  mounted() {},
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
