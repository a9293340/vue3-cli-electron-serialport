<script>
import { useStore } from "vuex";
import { computed, getCurrentInstance, onBeforeMount, onMounted } from "vue";
import AnswerPopWindow from "@/components/QuickAsk/AnswerPopWindow";

export default {
  components: {
    AnswerPopWindow,
  },
  setup() {
    const store = useStore();
    const controlWindowActions = computed(
      () => store.getters.controlWindowActions
    );
    const isShowShadow = computed(() => store.getters.isShowShadow);
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const { _ } = getCurrentInstance().appContext.config.globalProperties;

    const windowActions = (types) => {
      store.dispatch(
        "handleControlWindowActions",
        types === "+" || types === "r"
          ? types === "r"
          : controlWindowActions.value
      );
      window.ipcRenderer.send(
        types !== "x" ? "window-action" : "close-all-app",
        types
      );
    };

    const closeShadow = () => {
      store.dispatch("handleIsShowShadow", false);
    };

    onBeforeMount(() => {
      window.ipcRenderer.once("send-path-data", (eve, args) => {
        store.dispatch(
          "handleResourceDir",
          `${args.documents.replaceAll("\\", "/")}/tail-teeth`
        );
        store.dispatch("handleConfig", require("@/assets/resources/demo.json"));
      });
      window.ipcRenderer.send("get-path-data");
    });

    return {
      controlWindowActions,
      isShowShadow,
      pickConfig,
      windowActions,
      _,
      closeShadow,
    };
  },
};
</script>

<template>
  <div class="tail-teeth">
    <div class="top-list">
      <img
        src="@/assets/img/svg/window_shrink.svg"
        alt=""
        @click="windowActions('-')"
      />
      <img
        src="@/assets/img/svg/window_zoom_out.svg"
        v-if="controlWindowActions"
        @click="windowActions('+')"
      />
      <img
        src="@/assets/img/svg/window_zoom_in.svg"
        v-else
        alt=""
        @click="windowActions('r')"
      />
      <img
        src="@/assets/img/svg/window_close.svg"
        @click="windowActions('x')"
        alt=""
      />
    </div>
    <img class="logo" src="@/assets/img/logo/logo_120.png" />
    <div
      :class="['shadow', { 'shadow-show': isShowShadow }]"
      @click="closeShadow"
    ></div>
    <AnswerPopWindow
      v-if="!_.isEmpty(pickConfig)"
      :class="{ 'shadow-show': isShowShadow }"
    />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  position: relative;
}
.tail-teeth {
  width: 100vw;
  height: 100vh;
  position: relative;
  .logo {
    position: fixed;
    width: 7%;
    //height: 5%;
    top: 10px;
    left: 20px;
  }
  .top-list {
    width: 100%;
    height: 30px;
    min-height: 30px;
    -webkit-app-region: drag;
    @extend %flex-row-end;
    padding-right: 20px;
    user-select: none;
    z-index: 900;
    background: linear-gradient(90deg, #b4b4b4 0%, #e5e5e5 71%);

    img {
      width: 20px;
      margin-left: 20px;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
  }
  main {
    width: 100%;
    height: calc(100vh - 30px);
    padding: 20px;
  }
  .shadow {
    @extend %shadow;
  }
  .shadow-show {
    display: block;
  }
}
</style>
