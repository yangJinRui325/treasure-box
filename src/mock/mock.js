import Mock from "mockjs"; //es6语法引入mock模块

Mock.mock("/mock/getData", {
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

Mock.mock("/mock/getTreeBase", {
  //输出数据
  code: 200,
  message: "请求成功",
  data: {
    id: "1",
    name: "知识库",
    count: 0,
    children: [
      {
        id: "2",
        name: "基本数据库",
        "count|1000-10000": 1000,
        "children|1-10": [
          {
            id: Mock.mock("@id") + Mock.mock("@integer(10, 99)"),
            name: Mock.mock("@ctitle(4)"),
            "count|1000-10000": 1021,
          },
        ],
      },
      {
        id: "3",
        name: "基础知识",
        "count|1000-10000": 1000,
        "children|1-10": [
          {
            id: Mock.mock("@id") + Mock.mock("@integer(10, 99)"),
            name: Mock.mock("@ctitle(4)"),
            "count|1000-10000": 1021,
          },
        ],
      },
      {
        id: "4",
        name: "重要专题",
        "count|1000-10000": 1000,
        "children|1-10": [
          {
            id: Mock.mock("@id") + Mock.mock("@integer(10, 99)"),
            name: Mock.mock("@ctitle(4)"),
            "count|1000-10000": 1041,
          },
        ],
      },
    ],
  },
});

export default Mock;
