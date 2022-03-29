import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

import general from "@/store/general";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
  },
  plugins: [createPersistedState()],
});
