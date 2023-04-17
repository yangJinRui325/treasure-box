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
        <t-icon
          :name="collapse ? 'chevron-left-double' : 'chevron-right-double'"
        />
      </div>
      <div class="drawer-inner">
        <h2>属性配置</h2>
        <t-form :labelWidth="100">
          <t-form-item name="name" label="折线颜色">
            <t-color-picker
              @change="changeLineColor"
              v-model="formData.lineColor"
            />
          </t-form-item>
          <t-form-item label="折线类型" name="password">
            <t-select v-model="formData.lineType" @change="changeLineType">
              <t-option key="solid" label="实线" value="solid" />
              <t-option key="dashed" value="dashed">虚线</t-option>
              <t-option key="dotted" label="点" value="dotted" />
            </t-select>
          </t-form-item>
        </t-form>

        <p style="text-align: center; margin: 14px">
          <t-button theme="primary" @click="handleData"> 变更数据 </t-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultCfg } from "@/components/chart-line/chartLineCfg";

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
      formData: {
        lineColor: "#000000",
        lineType: "solid",
      },
    };
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
    changeLineColor(value) {
      // 此处配置覆盖方式和echart官方保持一致
      this.chartCfg.series[0].lineStyle.color = value;
    },
    changeLineType(type) {
      // 此处配置覆盖方式和echart官方保持一致
      this.chartCfg.series[0].lineStyle.type = type;
    },
    // 模拟数据请求
    handleData() {
      this.$axios.get("/mock/getData").then((data) => {
        let xAxis = [],
          yAxis = [];
        data.forEach(({ name, value }) => {
          xAxis.push(name);
          yAxis.push(value);
        });
        this.chartCfg.xAxis.data = xAxis;
        this.chartCfg.series[0].data = yAxis;
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
      font-size: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .drawer-inner {
      padding-right: 10px;
      color: #fff;
      box-shadow: -6px 0 10px rgba(0, 0, 0, 0.1);
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
