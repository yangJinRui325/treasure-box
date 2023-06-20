const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("less").oneOf(type))
    );
  },
  devServer: {
    proxy: {
      "/zupu": {
        target: "http://localhost:5600", // 代理地址(接口域名)
        changeOrigin: true, // 是否跨域
        // pathRewrite: { "^/zupu": "" }, //重写地址
      },
    },
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/style/variable.less")],
    });
}
