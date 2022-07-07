import { createStore } from 'vuex';

export default createStore({
  state: {
    asideIsMini: true,
  },
  mutations: {
    changeAsideIsMini(state, action) {
      state.asideIsMini = action;
    },
  },
  actions: {},
  modules: {},
});
