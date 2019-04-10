import Vue from "vue";
import Vuex, { Store } from "vuex";
import Tab from './models/Tab';
import { tabType } from './models/TabType';
import Graph from './models/Graph';
import Member from './models/Member';
import { customFieldCodeOptions, customFieldCodes, cardType } from './MapDataService';
import ServiceProvider from './ServiceProvider';
import Card from './models/Card';
// import createLogger from 'vuex/dist/logger';
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
  public cards: Card[] = [];
  public cardsRaw: cardType[] = [];
  public members: Member[] = [];
  public sprints: customFieldCodeOptions[] = [];
  public currentSprintId: string = null;
  public codes: customFieldCodes[] = [];
}

export default new Vuex.Store({
  state: new State({
    tabs: {
      category: null,
      range: null
    }
  }),
  plugins: [filterGraphs()],
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
    },
    setCodeList(state, codes) {
      state.codes = codes;
    },
    setCardRawList(state, cards) {
      state.cardsRaw = cards;
    }
  },
  getters: {},
  actions: {
    updateAllGraphs({commit, state}) {
      if(state.cards && state.codes && state.members && state.currentSprintId) {
        let data = {arr: state.cardsRaw, codes: state.codes, members: state.members, currentSprint: state.currentSprintId};
        let newGraphs = [];
        state.graphs.forEach((g, i) => {
          let newData = ServiceProvider.graphService.graphTypeToMethodMap[g.code](ServiceProvider.mapDataService.graphTypeToMethodMap[g.code](data));
          newGraphs.push(newData);
        });

        commit('setCardList', ServiceProvider.mapDataService.CardsToDataTile(data));
        commit('setGraphList', newGraphs);
      }
    },
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

export function filterGraphs() {
  let watchMuts = ['setCardRawList', 'setSprintList', 'setMemberList', 'setCodeList', 'setCurrentSprintId'];

  return (store: Store<State>) => {
    store.subscribe((mut, state) => {
      console.group(mut.type);
      console.log(mut);
      console.log(state);
      console.groupEnd();
      if(watchMuts.includes(mut.type)) {
        store.dispatch('updateAllGraphs');
      }
    });
  };
}