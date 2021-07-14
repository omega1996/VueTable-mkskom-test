<template>
  <v-card>
    <v-chart @click="clickChart" class="chart" :option="option" />
    <v-snackbar v-model="snackbar" :vertical="vertical">
      <v-list-item> id: {{ text.id }}; value {{ text.value }} </v-list-item>
      <v-list-item>
        item: {{ text.item_name }} ({{ text.item_description }})
      </v-list-item>
      <v-list-item>
        period: {{ text.period_name }} ({{ text.period_description }})
      </v-list-item>
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import ItemsPeriodsValues from "../services/ItemsPeriodsValues";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);
export default {
  name: "ItemsPeriods",
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },
  created() {
    this.initialize();
  },
  methods: {
    async clickChart(e) {
      await ItemsPeriodsValues.getInfo(e.name).then((e) => {
        this.text = e[0];
        this.snackbar = true;
      });
    },
    async initialize() {
      await ItemsPeriodsValues.getValues().then((items) => {
        this.option.xAxis.data = items.map((element) => element.id);
        this.option.series[0].data = items.map((element) => element.value);
      });
    },
  },
  data() {
    return {
      items: [],
      snackbar: false,
      text: {},
      vertical: true,
      isLoading: false,
      option: {
        title: {
          text: "Items за Periods",
        },
        tooltip: {
          show: true,
        },
        legend: {
          data: ["value"],
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
            name: "value",
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
