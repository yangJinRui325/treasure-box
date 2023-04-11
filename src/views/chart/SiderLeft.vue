<template>
  <div class="left-wrapper">
    <draggable v-model="list" :group="{ name: 'chart', pull: 'clone' }">
      <chart-line height="260px"></chart-line>
    </draggable>
  </div>
</template>
<script>
export default {
  name: "SiderLeft",
  props: {},
  components: {},
  computed: {},
  data() {
    return {
      list: ["ChartLine"],
    };
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.left-wrapper {
  width: 340px;
  height: 100%;
  padding: 0 20px;
  overflow-y: auto;
  box-shadow: 6px 0 10px rgba(0, 0, 0, 0.1);
}
</style>
