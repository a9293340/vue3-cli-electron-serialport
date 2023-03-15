import { createStore } from 'vuex';

export default createStore({
	state: {
		controlWindowActions: true,
	},
	mutations: {
		setControlWindowActions(state, bool) {
			state.controlWindowActions = bool;
		},
	},
	actions: {
		handleControlWindowActions({ commit }, bool) {
			commit('setControlWindowActions', bool);
		},
	},
	getters: {
		controlWindowActions(state) {
			return state.controlWindowActions;
		},
	},
});
