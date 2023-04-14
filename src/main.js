import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/plug/antd";
import "@/plug/tdesign";
import "@/plug/directive";
import "@/mock/mock.js";
import http from "@/http/index.js";
import "@/assets/style/common.less";
import * as echarts from "echarts";
import draggable from "vuedraggable";
import ChartLine from "@/components/chart-line/ChartLine";

Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = http;
Vue.config.productionTip = false;
Vue.component("draggable", draggable);
Vue.component("ChartLine", ChartLine);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
