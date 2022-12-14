<script>
import { useStore } from "vuex";
import { computed, getCurrentInstance, reactive, ref, watch } from "vue";

export default {
  name: "Question",
  setup() {
    const store = useStore();
    const isGoing = computed(() => store.getters["GameZone/isGoing"]);
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const isImgOptions = computed(() => store.getters["GameZone/isImgOptions"]);
    const config = computed(() => store.getters.config);
    const resourceDir = computed(() => store.getters.resourceDir);
    const timeCount = computed(() => store.getters["GameZone/timeCount"]);
    const isImgQuestion = ref(false);
    const isHideQuestion = ref(false);
    const isStop = ref(true);
    const titleImg = reactive({
      data: null,
    });
    const rules = ref([
      {
        title: "1) 採積分制；遊戲結束時，依照積分做排名，同分者另外進行PK",
        detail: [
          "-第一個 答對 6 分",
          "-第二個 答對 5 分",
          "… 以此類推",
          "- 答錯不計分",
        ],
      },
      {
        title: "2) 在時間內，各組透過 BT Scanner ，選條碼(A,B,C,D)來答題。",
        detail: [],
      },
      {
        title: "3) 時間內以cradle取到的第一筆答案為主，請謹慎答題。",
        detail: [],
      },
      {
        title: "4) PK賽 : 一局定生死",
        detail: [],
      },
    ]);
    const { _ } = getCurrentInstance().appContext.config.globalProperties;

    watch(timeCount, (newIndex) => {
      if (newIndex === "00") isStop.value = true;
    });

    const pickOut = () => {
      store.dispatch(
        "handleConfig",
        _.cloneDeep(config.value).filter(
          (el) => el["no"] !== pickConfig.value["no"]
        )
      );
      store.dispatch(
        "GameZone/handlePickConfig",
        _.first(_.shuffle(config.value))
      );
      // console.log(pickConfig.value);
      // console.log(config.value);
    };

    const pickConfigRender = (isTry) => {
      store.dispatch("GameZone/handleIsShowOptions", 0);
      store.dispatch("trigger/handleTriggerTimeout", 0);
      pickOut();
      if (isTry) store.dispatch("GameZone/handleIsGoing", true);
      if (pickConfig.value.title)
        isHideQuestion.value = pickConfig.value.title["type"] === "video";
      store.dispatch(
        "GameZone/handleIsImgOptions",
        pickConfig.value["options"].type === "img"
      );
      if (pickConfig.value.title["path"])
        titleImg.data =
          pickConfig.value.title["type"] === "img"
            ? require(`@/assets/resources/tail_teeth${pickConfig.value.title["path"]}`)
            : pickConfig.value.title["path"];

      isImgQuestion.value = pickConfig.value["title"].type !== "text";
    };

    const showOptions = () => {
      store.dispatch("GameZone/handleIsShowOptions", 1);
      isStop.value = false;
      isHideQuestion.value = false;
      store.dispatch("trigger/handleTriggerTimeout", 1);
    };

    const stopCounter = () => {
      isStop.value = true;
      store.dispatch("GameZone/handleTimeCount", "00");
    };

    return {
      isGoing,
      isImgOptions,
      pickConfig,
      isImgQuestion,
      rules,
      resourceDir,
      titleImg,
      isStop,
      isHideQuestion,
      pickConfigRender,
      showOptions,
      stopCounter,
    };
  },
};
</script>

<template>
  <div
    :class="[
      'question-component',
      {
        'not-going': !isGoing,
        'is-img': isImgOptions,
      },
    ]"
  >
    <div class="info-page">
      <div class="img-support" v-if="isImgQuestion">
        <img
          v-if="pickConfig.title['type'] === 'img'"
          :src="titleImg.data"
          alt=""
        />
        <iframe
          v-else
          width="500"
          height="250"
          :src="pickConfig.title['path']"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div :class="['txt-support', { 'have-img': isImgQuestion }]">
        <div class="rules" v-if="!isGoing">
          <p v-for="rule in rules" :key="rule.title">
            {{ rule.title }}
            <span v-for="detail in rule.detail">{{ detail }}</span>
          </p>
        </div>
        <div class="rules" v-else>
          <p class="p-large" v-if="!isHideQuestion">
            {{ pickConfig.title["desc"] }}
          </p>
        </div>
      </div>
    </div>
    <div class="operation-zone">
      <div :class="['btn', { show: isGoing }]">
        <img
          src="@/assets/img/logo/show.png"
          @click="showOptions"
          v-if="isStop"
          alt=""
        />
        <img
          src="@/assets/img/logo/stop.png"
          @click="stopCounter"
          v-else
          alt=""
        />
        <img
          src="@/assets/img/logo/next.png"
          @click="pickConfigRender(0)"
          alt=""
        />
        <img src="@/assets/img/logo/reset.png" style="height: 70%" alt="" />
        <img src="@/assets/img/logo/counter.png" alt="" />
      </div>
      <img
        src="@/assets/img/logo/logo_120.png"
        alt=""
        v-if="!isGoing"
        @click="pickConfigRender(1)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.question-component {
  width: 100%;
  height: 40%;
  border-radius: 5px;
  background-color: $grey1;
  padding: 10px;
  .info-page {
    width: 100%;
    height: 80%;
    padding: 20px;
    @extend %flex-row-center;
    .img-support,
    .txt-support {
      height: 100%;
      @extend %flex-row-center;
    }
    .img-support {
      width: 50%;
      img {
        height: 100%;
        max-width: 100%;
      }
    }
    .txt-support {
      width: 100%;
      .rules {
        @extend %flex-column-al-start-ju-start;
        p {
          font-size: 24px;
          font-weight: 900;
          margin: 0 0 15px;
          @extend %flex-column-al-start-ju-start;
          span {
            padding-left: 20px;
            margin-top: 5px;
            margin-bottom: 5px;
          }
        }
        .p-large {
          font-size: 36px;
        }
      }
    }
    .have-img {
      width: 50%;
    }
  }
  .operation-zone {
    width: 100%;
    height: 20%;
    @extend %flex-row-end;
    .btn {
      @extend %flex-row-end;
      width: 100%;
      height: 100%;
      opacity: 0;
      img {
        height: 90%;
        cursor: pointer;
        margin-left: 15px;
      }
    }
    .show {
      opacity: 1;
    }
    img {
      height: 80%;
      cursor: pointer;
    }
  }
}
.not-going {
  height: 100%;
}
.is-img {
  height: 30%;
}
</style>
