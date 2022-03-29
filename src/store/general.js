export default {
  state: {
    news: [],
    categories: ["Беларусь", "Россия", "Казахстан"],
  },
  mutations: {
    ADD_NEWS(state, payload) {
      state.news.push(payload);
    },
    DELETE_NEWS(state, payload) {
      state.news.forEach(function (el, i) {
        if (el.id == payload) state.news.splice(i, 1);
      });
    },
  },
  actions: {
    EDIT_NEWS({ commit }, payload) {
      commit("DELETE_NEWS", payload.id);
      commit("ADD_NEWS", payload);
    },
  },
  getters: {
    news: (state) => state.news,
    categories: (state) => state.categories,
  },
};
