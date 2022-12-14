import { createStore } from "vuex";
import GameZone from "./GameZone";
import trigger from "./trigger";

export default createStore({
  state: {
    controlWindowActions: true,
    resourceDir: "",
    documentDir: "",
    version: "",
    config: [],
    isShowShadow: false,
    teamScorePoint: [5, 4, 0, 3, 6, 0],
    plusData: [0, 0, 0, 0, 0, 0],
    borderColor: [
      "rgb(255,0,0)",
      "rgb(153,153,153)",
      "rgb(0,113,188)",
      "rgb(255,194,0)",
      "rgb(0,0,0)",
      "rgb(0,146,69)",
    ],
    teamScore: {
      1: {
        now: 0,
        plus: 0,
      },
      2: {
        now: 0,
        plus: 0,
      },
      3: {
        now: 0,
        plus: 0,
      },
      4: {
        now: 0,
        plus: 0,
      },
      5: {
        now: 0,
        plus: 0,
      },
      6: {
        now: 0,
        plus: 0,
      },
    },
  },
  mutations: {
    setControlWindowActions(state, bool) {
      state.controlWindowActions = bool;
    },
    setResourceDir(state, path) {
      state.resourceDir = path;
    },
    setDocumentDir(state, path) {
      state.documentDir = path;
    },
    setVersion(state, str) {
      state.version = str;
    },
    setConfig(state, arr) {
      state.config = arr;
    },
    setIsShowShadow(state, bool) {
      state.isShowShadow = bool;
    },
    setTeamScorePoint(state, arr) {
      state.teamScorePoint = arr;
    },
    setPlusData(state, arr) {
      state.plusData = arr;
    },
    setBorderColor(state, bool) {
      state.borderColor = bool;
    },
    setTeamScore(state, obj) {
      state.teamScore = obj;
    },
  },
  actions: {
    handleControlWindowActions({ commit }, bool) {
      commit("setControlWindowActions", bool);
    },
    handleResourceDir({ commit }, path) {
      commit("setResourceDir", path);
    },
    handleDocumentDir({ commit }, path) {
      commit("setDocumentDir", path);
    },
    handleVersion({ commit }, str) {
      commit("setVersion", str);
    },
    handleConfig({ commit }, str) {
      commit("setConfig", str);
    },
    handleIsShowShadow({ commit }, str) {
      commit("setIsShowShadow", str);
    },
    handleTeamScorePoint({ commit }, arr) {
      commit("setTeamScorePoint", arr);
    },
    handlePlusData({ commit }, arr) {
      commit("setPlusData", arr);
    },
    handleBorderColor({ commit }, str) {
      commit("setBorderColor", str);
    },
    handleTeamScore({ commit }, str) {
      commit("setTeamScore", str);
    },
  },
  getters: {
    controlWindowActions(state) {
      return state.controlWindowActions;
    },
    resourceDir(state) {
      return state.resourceDir;
    },
    documentDir(state) {
      return state.documentDir;
    },
    version(state) {
      return state.version;
    },
    config(state) {
      return state.config;
    },
    isShowShadow(state) {
      return state.isShowShadow;
    },
    teamScorePoint(state) {
      return state.teamScorePoint;
    },
    plusData(state) {
      return state.plusData;
    },
    borderColor(state) {
      return state.borderColor;
    },
    teamScore(state) {
      return state.teamScore;
    },
  },
  modules: {
    GameZone,
    trigger,
  },
});
