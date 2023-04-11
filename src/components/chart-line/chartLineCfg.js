export const lineStyle = {
  color: "inherit",
  type: "inherit",
  width: 2,
};

export const defaultCfg = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
      lineStyle: lineStyle,
    },
  ],
};
