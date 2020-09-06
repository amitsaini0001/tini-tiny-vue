import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    comicData: [],
    currentModal: null
  },
  mutations: {
    setComicData(state, comicData){
      state.comicData = comicData
    },
  },
  actions: {},
  modules: {},
  getters: {
    getComicData: state => state.comicData,
    getCurrentModal: state => state.currentModal
  }
});
