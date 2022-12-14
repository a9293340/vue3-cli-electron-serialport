<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  name: "Options",
  setup() {
    const store = useStore();
    const isGoing = computed(() => store.getters["GameZone/isGoing"]);
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const isImgOptions = computed(() => store.getters["GameZone/isImgOptions"]);
    const timeCount = computed(() => store.getters["GameZone/timeCount"]);
    const optionImg = {
      A: null,
      B: null,
      C: null,
      D: null,
    };
    const isShowOptions = computed(
      () => store.getters["GameZone/isShowOptions"]
    );

    const isText = computed(() => {
      getImgagePath();
      return Object.keys(pickConfig.value).length
        ? pickConfig.value["options"]["type"] === "text"
        : false;
    });

    const getImgagePath = () => {
      if (pickConfig.value["options"]["type"] === "img") {
        for (const pKey in pickConfig.value["options"]["desc"]) {
          optionImg[
            pKey
          ] = require(`@/assets/resources/tail_teeth${pickConfig.value.options["desc"][pKey]}`);
        }
      }
    };

    const openAnswerPop = () => {
      if (timeCount.value !== "00") return;
      //  open Answer pop
      store.dispatch("handleIsShowShadow", true);
    };

    return {
      isImgOptions,
      isGoing,
      pickConfig,
      isText,
      timeCount,
      openAnswerPop,
      isShowOptions,
      optionImg,
    };
  },
};
</script>

<template>
  <div
    :class="[
      'option-component',
      {
        'not-going': !isGoing,
        'is-img': isImgOptions,
      },
    ]"
  >
    <div class="is-text" v-if="isText && Object.keys(pickConfig).length">
      <div
        :class="[
          'option',
          {
            'is-answer':
              timeCount === '00' && pickConfig['answer']['desc'] === key,
          },
        ]"
        v-for="(conf, key) in pickConfig.options['desc']"
        :key="conf"
        @click="openAnswerPop"
      >
        <p>{{ key }} {{ conf }}</p>
      </div>
    </div>
    <div
      class="is-not-text"
      v-else-if="!isText && Object.keys(pickConfig).length"
    >
      <div
        :class="[
          'options',
          {
            'is-answer':
              timeCount === '00' && pickConfig['answer']['desc'] === key,
          },
        ]"
        v-for="(conf, key) in pickConfig.options['desc']"
        :key="conf"
        @click="openAnswerPop"
      >
        <p>{{ key }}</p>
        <img :src="optionImg[key]" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.option-component {
  width: 100%;
  height: 60%;
  border-radius: 5px;
  //background-color: $grey1;
  padding: 10px;
  .is-text {
    width: 100%;
    height: 100%;
    @extend %flex-column-al-start-ju-start;
    .option {
      width: 100%;
      height: 20%;
      margin-bottom: 4%;
      @extend %flex-row-center;
      padding: 20px;
      background-color: $blue2;
      border-radius: 8px;
      p {
        font-size: 36px;
        font-weight: 900;
        color: white;
      }
    }
    .is-answer {
      background-color: $red2;
    }
  }
  .is-not-text {
    width: 100%;
    height: 100%;
    @extend %flex-row-around;
    flex-wrap: wrap;
    .options {
      width: 45%;
      height: 45%;
      margin-bottom: 3%;
      background-color: $font1;
      border-radius: 5px;
      padding: 20px;
      @extend %flex-row-around;
      p {
        font-size: 20px;
        color: white;
        font-weight: 900;
      }
      img {
        max-width: 80%;
        max-height: 100%;
      }
    }
    .is-answer {
      background-color: $red2;
    }
  }
}
.not-going {
  height: 0%;
}
.is-img {
  height: 70%;
}
</style>
