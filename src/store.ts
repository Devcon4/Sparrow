import Vue from "vue";
import Vuex from "vuex";
import Tab from './models/Tab';

Vue.use(Vuex);

type tabType = {list: Tab[], activeIndex: number };

class State {
  constructor(args: Partial<State>) {
    Object.assign({},this, args);
  }

  public tabs: {[key: string]: tabType};
}

export default new Vuex.Store({
  state: new State({
    tabs: {}
  }),
  mutations: {
    updateTabActiveIndex(state, [key, index]) {
      state.tabs[key].activeIndex = index;
    },
    addTabRecord(state, [key, data]) {
      if(!state.tabs) { state.tabs = {}; }
      state.tabs[key] = data;
    }
  },
  getters: {
    getTab: state => (key: string) => {
      if(!state.tabs) { return {}; }
      return state.tabs[key];
    }
  },
  actions: {}
});
