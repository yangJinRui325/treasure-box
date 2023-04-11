<template>
  <a-layout class="layout-wrapper">
    <a-layout-header class="layout-header">
      <h2 class="title">{{ title }}</h2>
      <a-button
        v-if="isBack"
        type="primary"
        class="back"
        icon="rollback"
        @click="handlerBack"
      >
        返回上级
      </a-button>
    </a-layout-header>
    <a-layout-content class="layout-content">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script>
export default {
  name: "Layout",
  props: {},
  computed: {
    title() {
      return this.$route.meta.title || "合集";
    },
    isBack() {
      return this.$route.name !== "Home";
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    handlerBack() {
      this.$router.history.go(-1);
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
  .layout-header {
    color: #fff;
    position: relative;
    .title {
      margin: 0;
      color: #fff;
    }
    .back {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 20px;
      margin: auto;
    }
  }
  .layout-content {
    background-color: #fff;
  }
}
</style>
