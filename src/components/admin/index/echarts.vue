<template>
  <div id="echarts"></div>
</template>

<style lang="scss" scoped>
#echarts {
  width: 830px;
  height: 300px;
  margin-top: 20px;
}
</style>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted: function () {
    this.init();
  },
  methods: {
    init: function () {
      var chartDom = document.getElementById("echarts");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "基于福州市用户发布位置信息统计",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "鼓楼区" },
              { value: 735, name: "晋安区" },
              { value: 580, name: "台江区" },
              { value: 484, name: "仓山区" },
              { value: 300, name: "长乐区" },
              { value: 300, name: "闽侯县" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
