export default {
  namespaced: true,
  state: {
    triggerTimeout: 0,
    triggerSettlement: 0,
    triggerChart: 0,
  },
  mutations: {
    setTriggerTimeout(state, int) {
      state.triggerTimeout = int;
    },
    setTriggerSettlement(state, int) {
      state.triggerSettlement = int;
    },
    setTriggerChart(state, int) {
      state.triggerChart = int;
    },
  },
  actions: {
    handleTriggerTimeout({ commit }, int) {
      commit("setTriggerTimeout", int);
    },
    handleTriggerSettlement({ commit }, int) {
      commit("setTriggerSettlement", int);
    },
    handleTriggerChart({ commit }, int) {
      commit("setTriggerChart", int);
    },
  },
  getters: {
    triggerTimeout(state) {
      return state.triggerTimeout;
    },
    triggerSettlement(state) {
      return state.triggerSettlement;
    },
    triggerChart(state) {
      return state.triggerChart;
    },
  },
};
