<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px"></div>
    <div>当前污染程度：{{ pollutionLevel }}</div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "DynamicLineChart",
  data() {
    return {
      chart: null,
      option: {
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "数据",
            type: "line",
            data: [],
          },
        ],
      },
      data: [],
      pollutionLevel: "",
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.chart.setOption(this.option);
    this.updateData();
  },
  methods: {
    updateData() {
      setInterval(() => {
        this.addData();
        this.chart.setOption({
          xAxis: {
            data: this.option.xAxis.data,
          },
          series: [
            {
              data: this.option.series[0].data,
            },
          ],
        });
        this.updatePollutionLevel();
      }, 1000);
    },
    addData() {
      const now = new Date();
      const time =
        now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      const value = Math.random() * 100;
      this.option.xAxis.data.push(time);
      this.option.series[0].data.push(value);
      if (this.option.xAxis.data.length > 10) {
        this.option.xAxis.data.shift();
        this.option.series[0].data.shift();
      }
    },
    updatePollutionLevel() {
      const latestValue =
        this.option.series[0].data[this.option.series[0].data.length - 1];
      if (latestValue < 30) {
        this.pollutionLevel = "优";
      } else if (latestValue < 60) {
        this.pollutionLevel = "良";
      } else if (latestValue < 90) {
        this.pollutionLevel = "轻度污染";
      } else {
        this.pollutionLevel = "重度污染";
      }
    },
  },
};
</script>
