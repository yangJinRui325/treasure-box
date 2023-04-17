<template>
  <t-layout class="layout-wrapper">
    <t-header class="layout-header">
      <h2 class="title">{{ title }}</h2>
      <!-- <a-button
        v-if="isBack"
        type="primary"
        class="back"
        icon="rollback"
        @click="handlerBack"
      >
        返回上级
      </a-button> -->
      <t-button v-if="isBack" class="back" theme="primary" @click="handlerBack">
        <rollback-icon slot="icon" />
        <!-- <add-icon slot="icon" /> -->
        返回上级
      </t-button>
    </t-header>
    <t-content class="layout-content">
      <router-view></router-view>
    </t-content>
  </t-layout>
</template>
<script>
import { RollbackIcon } from "tdesign-icons-vue";
export default {
  name: "Layout",
  props: {},
  components: {
    RollbackIcon,
  },
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
    background-color: #242424;
    .title {
      margin: 0;
      height: 100%;
      line-height: 56px;
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
