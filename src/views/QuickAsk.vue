<script>
import { useStore } from "vuex";
import { computed, getCurrentInstance } from "vue";
import TimeCounter from "@/components/QuickAsk/TimeCounter";
import TeamPoints from "@/components/QuickAsk/TeamPoints";
import TextZone from "@/components/QuickAsk/TextZone";
import Question from "@/components/QuickAsk/Question";
import Options from "@/components/QuickAsk/Options";

export default {
  name: "QuickAsk",
  components: {
    TimeCounter,
    TeamPoints,
    TextZone,
    Question,
    Options,
  },
  setup() {
    const store = useStore();
    const isShowOptions = computed(
      () => store.getters["GameZone/isShowOptions"]
    );

    return {
      isShowOptions,
    };
  },
};
</script>

<template>
  <div class="quick-ask">
    <div class="detail-zone">
      <div class="time-counter">
        <TimeCounter />
      </div>
      <div class="team-points">
        <TeamPoints />
      </div>
      <div class="text-zone">
        <TextZone />
      </div>
    </div>
    <div class="game-zone">
      <Question />
      <Options v-if="isShowOptions" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";

.quick-ask {
  width: 100%;
  height: 100%;
  @extend %flex-row-start;
  .detail-zone,
  .game-zone {
    height: 100%;
    @extend %flex-column-al-start-ju-start;
  }
  .detail-zone {
    width: 40%;
    .time-counter {
      height: 20%;
      width: 100%;
    }
    .team-points {
      width: 100%;
      height: 40%;
    }
    .text-zone {
      width: 100%;
      height: 40%;
    }
  }
  .game-zone {
    width: 60%;
    padding: 15px;
  }
}
</style>
