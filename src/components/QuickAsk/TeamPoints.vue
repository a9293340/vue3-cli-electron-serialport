<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { delay } from "@/assets/api/delay";

Chart.register(ChartDataLabels, ...registerables);
export default {
  name: "TeamPoints",
  components: {
    BarChart,
  },
  setup() {
    const store = useStore();
    const { _ } = getCurrentInstance().appContext.config.globalProperties;
    const teamScore = computed(() => store.getters.teamScore);
    const teamScorePoint = ref([0, 0, 0, 0, 0, 0]);
    const borderColor = computed(() => store.getters.borderColor);
    const maxScale = computed(() => _.max(teamScorePoint.value) + 7);
    const triggerChart = computed(() => store.getters["trigger/triggerChart"]);
    const plusData = ref([0, 0, 0, 0, 0, 0]);
    const doughnutRef = ref();
    const backgroundColor = borderColor.value.map(
      (el) =>
        `${el.slice(0, _.lastIndexOf(el.split(""), ")"))},0.2${el.slice(
          _.lastIndexOf(el.split(""), ")")
        )}`
    );
    const chartData = computed(() => ({
      labels: ["team 1", "team 2", "team 3", "team 4", "team 5", "team 6"],
      datasets: [
        {
          axis: "y",
          data: teamScorePoint.value,
          datalabels: {
            display: (val) => val.dataset.data[val.dataIndex],
            color: (val) => borderColor.value[val.dataIndex],
            font: {
              weight: "bold",
              size: 22,
            },
          },
          barThickness: 18,
          fill: false,
          backgroundColor,
          borderColor: borderColor.value,
          borderWidth: 1,
        },
        {
          data: plusData.value,
          datalabels: {
            display: (val) => val.dataset.data[val.dataIndex],
            formatter: (val) => `+${val}`,
            anchor: "end",
            color: "rgb(255, 99, 132)",
            font: {
              weight: "bold",
              size: 24,
            },
          },
          barThickness: 18,
          type: "bar",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    }));
    const options = ref({
      responsive: true,
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Doughnut Chart",
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            major: {
              enabled: true,
            },
            font: {
              weight: "bold",
              size: 18,
            },
          },
          max: maxScale,
          // grid: {
          //   display: false,
          // },
        },
        y: {
          stacked: true,
          // grid: {
          //   display: false,
          // },
          ticks: {
            major: {
              enabled: true,
            },
            color: (val) => borderColor.value[val.index],
            font: {
              weight: "bold",
              size: 18,
            },
          },
        },
      },
      datalabels: {
        display: "auto",
        color: "#005599",
        backgroundColor: "rgb(210,210,210,0.8)",
        font: {
          weight: "bold",
          size: 30,
        },
        anchor: "end",
        align: "end",
        offset: 4,
      },
    });

    watch(triggerChart, async () => {
      await delay(800);
      plusData.value = obj2Arr(teamScore.value, "plus");
      await delay(800);
      teamScorePoint.value = plusData.value.map(
        (el, i) => teamScorePoint.value[i] + el
      );
      plusData.value = [0, 0, 0, 0, 0, 0];
    });

    const obj2Arr = (obj, key) => {
      let arr = [];
      for (const valueKey in obj) {
        arr.push(teamScore.value[valueKey][key]);
      }
      return arr;
    };

    onMounted(() => {
      doughnutRef.value.update();
    });

    return {
      chartData,
      doughnutRef,
      options,
    };
  },
};
</script>

<template>
  <div class="team-points-component">
    <BarChart
      class="bar"
      ref="doughnutRef"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";

.team-points-component {
  width: 100%;
  height: 100%;
  @extend %flex-row-center;
  .bar {
    width: 100%;
    height: 100%;
  }
}
</style>
