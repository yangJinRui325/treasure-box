<template>
  <div class="home-wrapper">
    <ul class="feature-box">
      <li
        class="feature-item"
        v-for="(feature, idx) in features"
        :key="'feature' + idx"
        @click="feature.handler"
      >
        <div class="feature-item-left" :style="{ background: feature.color }">
          <img :src="feature.img" alt="" />
        </div>
        <div class="feature-item-right">
          <p class="title">{{ feature.title }}</p>
          <p class="message" v-html="feature.message"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Home",
  props: {},
  computed: {},
  data() {
    return {
      features: [
        {
          color: "#FAEDC9",
          title: "G6树形结构",
          message: "自定义树形结构",
          img: "https://imgs1.zupu.cn/static/web/images/zupuking/hf-6.png",
          handler: () => {
            this.$router.push("/g6");
          },
        },
        {
          color: "#BDEFFF",
          title: "chart拖拽",
          message: "拖拽图表，自行配置属性",
          img: "https://imgs1.zupu.cn/static/web/images/zupuking/hf-1.png",
          handler: () => {
            this.$router.push("/chart");
          },
        },
      ],
    };
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>
<style lang="less" scoped>
.home-wrapper {
  padding: 40px;
}
.feature-box {
  display: flex;
  flex-wrap: wrap-reverse;

  .feature-item {
    width: 380px;
    height: 200px;
    border-radius: 16px;
    border: 1px solid #dcdcdc;
    padding: 34px;
    margin-right: 40px;
    text-align: justify;
    overflow: hidden;
    display: grid;
    grid-template-columns: 60px auto;
    grid-column-gap: 14px;
    cursor: pointer;
    .feature-item-left {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 30px;
      }
    }
    .feature-item-right {
      height: 100%;
      overflow: hidden;
      p {
        margin: 0;
      }
      .title {
        font-size: 24px;
        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
        font-weight: bold;
        color: #333333;
      }
      .message {
        margin-top: 12px;
        line-height: 29px;
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
    }

    .add {
      font-size: 50px;
      color: #acacac;
    }

    .addtit {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #b0b0b0;
    }

    &:hover {
      background: #ffffff;
      box-shadow: 6px 5px 21px 0px rgba(179, 11, 32, 0.2);
    }
  }
}
</style>
