import Vue from "vue";
import Vuex from "vuex";
import Tab from './models/Tab';
import { tabType } from './models/TabType';
import Graph from './models/Graph';
import Member from './models/Member';
import { customFieldCodeOptions } from './MapDataService';

Vue.use(Vuex);

class State {
  constructor(args: Partial<State>) {
    Object.assign({},this, args);
  }

  public tabs: {[key: string]: tabType} = {};
  public selectedRange: Tab = null;
  public selectedCategory: Tab = null;
  public selectedGraph: Graph = null;
  public graphs: Graph[] = [];
  public cards: any[] = [];
  public members: Member[] = [];
  public sprints: customFieldCodeOptions[] = [];
  public currentSprintId: string = null;
}

export default new Vuex.Store({
  state: new State({
    tabs: {
      category: null,
      range: null
    }
  }),
  mutations: {
    setCategoryTabs(state, data) {
      if(!state.tabs) { state.tabs = {}; }
      state.tabs.category = {...data};
      state.selectedCategory = state.tabs.category.list[0];
    },
    setRangeTabs(state, data) {
      if(!state.tabs) { state.tabs = {}; }
      state.tabs.range = {...data};
      state.selectedRange = state.tabs.range.list[0];
    },
    setMemberList(state, list) {
      state.members = [...list];
    },
    setGraphList(state, list) {
      state.graphs = [...list];
    },
    setSelectedGraph(state, graph) {
      state.selectedGraph = graph;
    },
    setRangeFilter(state, tab) {
      state.selectedRange = tab;
    },
    setCategoryFilter(state, tab) {
      state.selectedCategory = tab;
    },
    setCardList(state, list) {
      state.cards = list;
    },
    setSprintList(state, list) {
      state.sprints = list;
    },
    setCurrentSprintId(state, id) {
      state.currentSprintId = id;
    }
  },
  getters: {},
  actions: {
    updateSelectedGraph({commit, state}) {
      if(state.selectedCategory && state.graphs) {
        let found = state.graphs.find(g => g.code === state.selectedCategory.value);
        if(found) {
          commit('setSelectedGraph', found);
        }
      }
    }
  }
});
