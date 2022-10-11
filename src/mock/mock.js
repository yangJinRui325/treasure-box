import Mock from "mockjs"; //es6语法引入mock模块

export default Mock.mock("/getData", {
  //输出数据
  code: 200,
  message: "请求成功",
  "data|1-10": [
    {
      "name|+1": ["杭州", "上海", "北京", "山西", "重庆"],
      "value|1-100": 100,
    },
  ],
});
