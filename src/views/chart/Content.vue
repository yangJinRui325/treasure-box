<template>
  <div class="painting-wrapper">
    <draggable
      v-model="painting"
      v-chartsWeith="onResize"
      class="painting-inner"
      :class="{ collapse: collapse }"
      :group="{ name: 'chart' }"
      @change="onChange"
    >
      <components :is="painting[0]" :cfg="chartCfg" ref="chart"></components>
    </draggable>

    <div class="drawer" :class="{ collapse: collapse }">
      <div class="hadler" @click="collapse = !collapse">
        <a-icon :type="collapse ? 'double-left' : 'double-right'" />
      </div>
      <div class="drawer-inner">
        <h2>属性配置</h2>
        <a-form id="propertyCfg" :form="form" v-bind="formItemLayout">
          <a-form-item label="折线颜色">
            <input
              type="color"
              @change="changeLineColor"
              v-decorator="['lineColor']"
            />
          </a-form-item>
          <a-form-item label="折线类型">
            <a-select
              default-value="solid"
              v-decorator="[
                'lineType',
                {
                  getValueFromEvent: (e) => e.target.value.toUpperCase(),
                },
              ]"
              placeholder="请选择折线类型"
              @change="changeLineType"
            >
              <a-select-option value="solid"> 实线 </a-select-option>
              <a-select-option value="dashed"> 虚线 </a-select-option>
              <a-select-option value="dotted"> 点 </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
        <p style="text-align: center">
          <a-button type="primary" @click="handleData"> 变更数据 </a-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultCfg } from "@/components/chart-line/chartLineCfg";
import axios from "axios";

export default {
  name: "Content",
  props: {},
  computed: {},
  data() {
    return {
      painting: [],
      chartCfg: defaultCfg,
      defaultCfg,

      // 属性面板相关
      collapse: true,
      form: null,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "property" });
  },
  mounted() {},
  methods: {
    onChange() {
      // 拖拽的内容变更,此处demo只有第一个生效
      this.collapse = false; // 默认展开属性面板
    },
    // 属性面板配置相关
    onResize() {
      this.$refs?.chart?.resizeChart();
    },
    changeLineColor(e) {
      // 此处配置覆盖方式和echart官方保持一致
      this.chartCfg.series[0].lineStyle.color = e.target.value;
    },
    changeLineType(type) {
      // 此处配置覆盖方式和echart官方保持一致
      this.chartCfg.series[0].lineStyle.type = type;
    },
    // 模拟数据请求
    handleData() {
      axios.get("/getData").then((res) => {
        // 此处省略axios拦截相关
        const { data: response } = res;
        const { code, data } = response;
        if (code === 200) {
          let xAxis = [],
            yAxis = [];
          data.forEach(({ name, value }) => {
            xAxis.push(name);
            yAxis.push(value);
          });
          this.chartCfg.xAxis.data = xAxis;
          this.chartCfg.series[0].data = yAxis;
        }
      });
    },
  },
  watch: {},
};
</script>
<style lang="less" scoped>
.painting-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .painting-inner {
    height: 100%;
    padding: 20px;
    max-width: 100%;
    margin-right: 400px;
    &.collapse {
      margin-right: 40px;
    }
  }
  .drawer {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 400px;
    height: 100%;
    display: grid;
    grid-template-columns: 40px auto;
    transition: all 0.3s;
    &.collapse {
      transform: translateX(370px);
    }
    .hadler {
      cursor: pointer;
      width: 40px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px 0 0 2px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
    }
    .drawer-inner {
      color: #fff;
      box-shadow: -6px 0 10px rgba(0, 0, 0, 0.1);
      // background-color: rgba(0, 0, 0, 0.7);
      h2 {
        line-height: 40px;
      }
    }
  }
}
#propertyCfg {
  color: #fff;
  ::v-deep label {
    font-size: 16px !important;
  }
}
</style>
