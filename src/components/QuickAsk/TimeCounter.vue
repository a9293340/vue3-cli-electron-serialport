<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  name: "TimeCounter",
  setup() {
    const store = useStore();
    const timeCount = computed(() => store.getters["GameZone/timeCount"]);
    const timeOver = ref(false);
    const triggerSettlement = computed(
      () => store.getters["trigger/triggerSettlement"]
    );
    const triggerTimeout = computed(
      () => store.getters["trigger/triggerTimeout"]
    );

    let timeOut;

    watch(triggerTimeout, (newIndex) => {
      newIndex ? reciprocal() : resetTimeCounter();
    });

    const resetTimeCounter = () =>
      store.dispatch("GameZone/handleTimeCount", "20");

    const reciprocal = () =>
      (timeOut = setInterval(() => {
        store.dispatch(
          "GameZone/handleTimeCount",
          (parseInt(timeCount.value) - 1).toString().padStart(2, "0")
        );
      }, 1000));

    watch(timeCount, (newIndex) => {
      if (newIndex === "00") {
        console.log("Clear timeOut!");
        clearInterval(timeOut);
        store.dispatch(
          "trigger/handleTriggerSettlement",
          triggerSettlement.value + 1
        );
      }
      timeOver.value = newIndex === "00";
    });

    return {
      timeOver,
      timeCount,
    };
  },
};
</script>

<template>
  <div class="time-counter-component">
    <h1 :class="[{ 'timeout-color': timeOver }]" @click="test">
      0 : {{ timeCount }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.time-counter-component {
  width: 100%;
  height: 100%;
  @extend %flex-row-center;
  h1 {
    font-size: 100px;
    color: $font1;
    font-weight: 900;
  }
  .timeout-color {
    color: $red1;
  }
}
</style>
