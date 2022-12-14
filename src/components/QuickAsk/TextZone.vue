<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  name: "TextZone",
  setup() {
    const store = useStore();
    const borderColor = computed(() => store.getters.borderColor);
    const scanOutputData = ref([]);
    const inputPlusData = ref([0, 0, 0, 0, 0, 0]);
    const triggerSettlement = computed(
      () => store.getters["trigger/triggerSettlement"]
    );
    const triggerChart = computed(() => store.getters["trigger/triggerChart"]);
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const teamScore = computed(() => store.getters.teamScore);
    let tempData = ["4:A", "1:D", "3:C", "5:B", "2:B", "6:B"];

    watch(triggerSettlement, () => {
      scanOutputData.value = tempData.map((el) => el.split(":"));
      let score = 6;
      setTimeout(() => {
        inputPlusData.value = scanOutputData.value.map((scan) =>
          scan[1] === pickConfig.value["answer"]["desc"] ? score-- : 0
        );
        countScore();
      }, 500);
    });

    const countScore = () => {
      let temp = _.cloneDeep(teamScore.value);
      scanOutputData.value.forEach((scan, i) => {
        temp[parseInt(scan[0])]["plus"] = inputPlusData.value[i];
      });
      store.dispatch("handleTeamScore", temp);
      store.dispatch("trigger/handleTriggerChart", triggerChart.value + 1);
      console.log(temp);
    };

    return {
      borderColor,
      scanOutputData,
      inputPlusData,
    };
  },
};
</script>

<template>
  <div class="text-zone-component">
    <div class="title">Scanner Output :</div>
    <div class="answer-lists" v-if="scanOutputData.length">
      <p
        class="list"
        :style="{ color: borderColor[parseInt(data[0]) - 1] }"
        v-for="(data, i) in scanOutputData"
        :key="data + '1'"
      >
        第{{ data[0] }}組 : {{ data[1] }}
        <span :class="{ toOpacity: !!inputPlusData[i] }">
          + {{ inputPlusData[i] }}
        </span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
@keyframes opacity {
  0% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.text-zone-component {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: $grey1;
  padding: 10px;
  @extend %flex-column-al-start-ju-start;
  .title {
    font-size: 32px;
    font-weight: 900;
    color: $grey2;
    margin-bottom: 8px;
  }
  .answer-lists {
    padding-left: 20px;
    @extend %flex-column-al-start-ju-start;
    p.list {
      font-size: 30px;
      margin-bottom: 10px;
      margin-top: 0;
      position: relative;
      span {
        width: 50px;
        font-size: 26px;
        position: absolute;
        left: 140px;
        top: -8px;
        opacity: 0;
        color: $purple2;
      }
      .toOpacity {
        transition-duration: 0.6s;
        animation-duration: 2s;
        animation-name: opacity;
      }
    }
  }
}
</style>
