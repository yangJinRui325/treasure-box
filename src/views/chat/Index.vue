<template>
  <div class="chat-box">
    <div class="chat-wrapper">
      <div class="chat-aside"></div>
      <div class="chat-room">
        <h2 class="chat-room__title">聊天室</h2>
        <div class="chat-room__content">
          <ul>
            <li
              class="li"
              :class="{ user: item.uid == uid }"
              v-for="(item, index) in messageList"
              :key="index"
            >
              <template v-if="item.type === 1">
                <p class="join-tips">{{ item.msg }}</p>
              </template>
              <template v-else>
                <p class="message-date">
                  <span class="m-nickname">{{ item.nickname }}</span>
                  {{ item.date }}
                </p>
                <p class="message-box">
                  <t-avatar :class="item.uid === uid ? 'right' : 'left'">
                    {{ item.nickname.substr(-1, 1) }}
                  </t-avatar>
                  <span class="bubble" v-html="item.msg"></span>
                </p>
              </template>
            </li>
          </ul>
        </div>
        <div class="chat-room__input">
          <div class="chat-bar">工具栏</div>
          <div class="chat-message" contenteditable="true"></div>
          <t-button class="chat-send" theme="primary" @click="send">
            <template #icon>
              <i class="iconfont trea-send"></i>
            </template>
            发送
          </t-button>
        </div>
      </div>
    </div>
    <t-dialog
      header="对话框标题"
      :visible="showInfoDialog"
      :onClose="() => (showInfoDialog = false)"
      :onConfirm="sure"
    >
      <div slot="body">
        <t-input
          clearable
          v-model="nickname"
          placeholder="请输入你的昵称"
          style="max-width: 500px"
        />
      </div>
    </t-dialog>
  </div>
</template>
<script>
import moment from "moment"; // 需要下载moment。npm install moment --save
export default {
  name: "",
  data() {
    return {
      ws: "",
      showInfoDialog: false,
      nickname: "",
      uid: this.uid,
      messageList: [],
      msg: "", // 输入的消息内容
      msgdom: null,
    };
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.msgdom = document.getElementsByClassName("chat-message")[0];
    });
  },
  methods: {
    // 初始化
    init() {
      if (window.WebSocket) {
        let user = {};
        if (localStorage.getItem("WEB_IM_USER")) {
          user = JSON.parse(localStorage.getItem("WEB_IM_USER"));
          this.nickname = user.nickname || "";
          this.uid = user.uid || "";
        }

        // 没有当前人信息就弹窗去填写
        if (!this.uid) {
          this.showInfoDialog = true;
        } else {
          this.contactSocket();
        }

        // 监听回车事件
        const vm = this;
        document.onkeydown = function (event) {
          const e = event || window.event;
          if (e && e.keyCode == 13) {
            console.log("触发enter");
            vm.send();
          }
        };
      } else {
        console.log("当前浏览器不支持WebSocket！");
      }
    },
    // 模态框确认事件
    sure() {
      this.showInfoDialog = false;
      this.contactSocket();
    },

    // enter触发 或者 点击“发送”触发
    send() {
      const msg = this.msgdom.innerHTML;
      if (!msg) return;
      this.sendMessage(2, msg);
    },

    // 发送信息给客户端
    sendMessage(type, msg) {
      const data = {
        uid: this.uid,
        type,
        nickname: this.nickname,
        msg,
      };
      this.ws.send(JSON.stringify(data));
      this.msgdom.innerHTML = "";
    },

    // 连接websocket
    contactSocket() {
      const that = this;
      this.ws = new WebSocket("ws://192.168.50.25:8888");
      const ws = this.ws;
      console.log(ws);
      ws.onopen = function () {
        console.log("连接服务器成功");
        // 没有当前人信息的话，需要缓存下
        if (!that.uid) {
          that.uid = "web_im_" + moment().valueOf();
          localStorage.setItem(
            "WEB_IM_USER",
            JSON.stringify({
              uid: that.uid,
              nickname: that.nickname,
            })
          );
        }
        that.sendMessage(1);
      };
      // 监听来自于服务端的消息
      ws.onmessage = function (e) {
        that.messageList.push(JSON.parse(e.data));
      };
      ws.onclose = function () {
        console.log("连接已关闭");
      };
    },
  },
};
</script>
<style scoped lang="less">
.chat-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/images/chat_bg.jpg") center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

.chat-aside {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.chat-wrapper {
  width: 1200px;
  height: 80vh;
  display: grid;
  grid-template-columns: 360px auto;
  grid-column-gap: 20px;
}

.chat-room {
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;

  &__title {
    text-align: center;
    background-color: #f5f5f5;
    margin: 0;
    padding: 20px 0;
  }

  &__content {
    flex: 1;
    padding: 0 16px;
    .join-tips {
      position: relative !important;
      display: block;
      width: 100%;
      padding: 10px;
      left: 0 !important;
      transform: none !important;
      color: #fff;
      font-size: 15px;
      text-align: center;
    }
    .li {
      position: relative;
      margin-bottom: 15px;
      text-align: left;
      color: @primary-color;
      &:after {
        content: "";
        display: block;
        clear: both;
      }
      .message-date {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.5);
      }
      .m-nickname {
        color: #fff;
      }
      &.user {
        text-align: right;
      }
    }
    .message-box {
      line-height: 30px;
      font-size: 20px;
      margin-top: 6px;

      .right {
        float: right;
        margin-left: 6px;
      }
      .left {
        float: left;
        margin-right: 6px;
      }
      .bubble {
        text-align: left;
        max-width: 80%;
        display: inline-block;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 6px;
        padding: 2px 6px;
        color: #000;
      }
    }
  }

  &__input {
    position: relative;
    height: 200px;
    background: #fff;
    padding: 0 20px 20px;
    display: flex;
    flex-direction: column;
  }
}

.chat-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.chat-message {
  width: 100%;
  flex: 1;
  outline: none;
}

.chat-send {
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 10;
  width: 90px;
  letter-spacing: 2px;

  .iconfont {
    margin-right: 6px;
  }
}
</style>
