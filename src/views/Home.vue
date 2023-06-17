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
          <i class="iconfont" :class="feature.icon"></i>
        </div>
        <div class="feature-item-right">
          <p class="title">{{ feature.title }}</p>
          <p class="message" v-html="feature.message"></p>
          <p class="message">
            <t-tag
              v-for="(tag, index) in feature.skill"
              :key="index"
              :theme="['primary', 'success', 'warning', 'danger'][index]"
              variant="light"
            >
              {{ tag }}
            </t-tag>
          </p>
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
          skill: ["antv/G6", "自定义节点"],
          icon: "trea-tree",
          handler: () => {
            this.$router.push("/g6");
          },
        },
        {
          color: "#BDEFFF",
          title: "X6家谱树",
          message: "自定义族谱树结构",
          skill: ["antv/X6", "SVG"],
          icon: "trea-jiapu",
          handler: () => {
            this.$router.push("/x6");
          },
        },
        {
          color: "#c8ffd8",
          title: "Chart拖拽",
          message: "拖拽图表，自行配置属性",
          skill: ["echart", "draggable"],
          icon: "trea-chart",
          handler: () => {
            this.$router.push("/chart");
          },
        },
        {
          color: "#DEBEFD",
          title: "聊天室",
          message: "websocket 在线实时聊天",
          skill: ["node.js", "websocket"],
          icon: "trea-chat",
          handler: () => {
            this.$router.push("/chat");
          },
        },
        {
          color: "#FAEDC9",
          title: "SVG图标",
          message: "自定义绘制svg图像",
          skill: ["SVG", "CSS"],
          icon: "trea-svg",
          handler: () => {
            this.$router.push("/svg");
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
  padding: 20px;
}

.feature-box {
  display: flex;
  flex-wrap: wrap;

  .feature-item {
    width: 380px;
    border-radius: 16px;
    border: 1px solid #dcdcdc;
    padding: 34px;
    margin: 20px;
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

      .iconfont {
        font-size: 25px;
        font-weight: 600;
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
        span {
          margin-right: 6px;
        }
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
