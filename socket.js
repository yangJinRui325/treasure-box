const ws = require("nodejs-websocket");
const moment = require("moment");

function broadcast(obj) {
  server.connections.forEach(function (conn) {
    // 注意：这里是server,不是ws
    conn.sendText(JSON.stringify(obj)); // 注意：这里得转成字符串发送过去，不然会报错。
  });
}

const server = ws
  .createServer(function (conn) {
    conn.on("text", function (data) {
      const obj = JSON.parse(data);
      switch (obj.type) {
        case 1:
          broadcast({
            type: 1,
            nickname: obj.nickname,
            uid: obj.uid,
            msg: `${obj.nickname}进入了聊天室`,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          break;
        case 2:
          broadcast({
            type: 2,
            nickname: obj.nickname,
            uid: obj.uid,
            msg: obj.msg,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
          break;
      }
    });

    conn.on("close", function (e) {
      console.log(e, "服务端连接关闭");
    });

    conn.on("error", function (e) {
      console.log(e, "服务端异常");
    });
  })
  .listen(8888);
console.log("服务端已开启");
