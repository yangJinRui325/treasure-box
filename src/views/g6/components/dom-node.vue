<template>
  <div>
    <!-- 根节点 -->
    <div
      class="root-node catalog-node"
      :id="id"
      v-if="type === '1'"
      :attrData="attrData"
    >
      {{ name }}
    </div>
    <!-- 二级节点 -->
    <div
      v-if="type === '2'"
      class="second-node catalog-node"
      :style="{
        'justify-content': name === '基本数据库' ? 'flex-end' : 'flex-start',
        'margin-left': name === '基本数据库' ? '30px' : '0',
        'font-size': fontSize + 'PX',
      }"
      :id="id"
      :attrData="attrData"
    >
      <div class="second-node__item">
        <span class="second-node__item-name">{{ name }}</span>
        <span class="second-node__item-count">
          {{ count }}
          <p style="color: #191f25; margin: 0">条</p>
        </span>
      </div>
    </div>
    <!-- 其他接点 -->
    <div
      v-if="type === '3'"
      class="other-node catalog-node"
      :style="{
        'font-size': fontSize + 'PX',
        'justify-content': catalogType == 1 ? 'flex-end' : 'flex-start',
      }"
      :id="id"
      :attrData="attrData"
    >
      <div class="other-node__item">
        <span class="second-node__item-name">{{ name }}</span>
        <span class="second-node__item-count" style="margin-left: 10px">
          {{ count }}
          <p style="color: #191f25; margin: 0">条</p>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dom-node",
  props: {
    // dom类型，设置三类
    type: {
      type: String,
      default: "1",
    },
    name: {
      type: String,
      default: "",
    },
    count: {
      type: [Number, String],
      default: null,
    },
    width: {
      type: Number,
      default: 0,
    },
    id: {
      type: [Number, String],
      default: null,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    attrData: {
      type: [Number, String],
      default: null,
    },
  },
  computed: {
    catalogType() {
      const catalogType = this.attrData.split("-")[2];
      return catalogType;
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
// 根节点
.root-node {
  cursor: pointer;
  margin-right: 20px;
  background-color: #1890ff;
  border-radius: 4px;
  width: 130px;
  height: 60px;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

// 二级节点
.second-node {
  cursor: pointer;
  width: 140px;
  display: flex;
  flex-direction: row;
  font-family: "PingFang SC";
  font-weight: 400;
}

.second-node__item {
  background-color: #fff;
  border: 1px solid #dadada;
  border-radius: 4px;
  width: 140px;
  height: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
}

.second-node__item-name {
  color: #191f25;
}

.second-node__item-count {
  color: #333;
  display: flex;
  align-items: center;
}

// 其他节点
.other-node {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  // margin-right: 10px;
  // justify-content: flex-end;
}

.other-node__item {
  // max-width: 300PX;
  min-height: 42px;
  background-color: #fff;
  border: 1px solid #dadada;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  text-align: left;
  // line-height: 54PX;
}
</style>
