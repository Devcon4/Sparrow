import Vue from "vue";
import Vuex, { Store } from "vuex";
import Tab from './models/Tab';
import { tabType } from './models/TabType';
import Graph from './models/Graph';
import Member from './models/Member';
import { customFieldCodeOptions, customFieldCodes, cardType } from './MapDataService';
import ServiceProvider from './ServiceProvider';
import Card from './models/Card';
import { GraphTypes } from './models/GraphTypes';
// import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);

export class State {
  constructor(args: Partial<State>) {
    Object.assign({},this, args);
  }

  public categoryTabs: tabType = null;
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
  public daysOfMonth: {total: number, remaining: number, percent: number} = null;
}

export default new Vuex.Store({
  state: new State({}),
  plugins: [filterGraphs()],
  mutations: {
    setDaysOfMonth(state) {
      let today = new Date();
      let daysInMonth = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate();
      let remaining = daysInMonth - today.getDate();
      state.daysOfMonth = {total: daysInMonth, remaining, percent: (today.getDate()/daysInMonth) * 100};
    },
    setCategoryTabs(state, data) {
      state.categoryTabs = {...data};
    },
    setMemberList(state, list) {
      state.members = [...list];
    },
    setGraphList(state, list) {
      state.graphs = [...list];
    },
    setSelectedGraph(state, graph: Graph) {
      state.selectedGraph = graph;
    },
    setRangeFilter(state, tab) {
      state.selectedRange = tab;
    },
    setCategoryFilter(state, tab) {
      state.selectedCategory = tab;
      state.categoryTabs.activeIndex = state.categoryTabs.list.findIndex(t => t.value === tab.value);
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
      console.log('UpdateAllGraphs!');
      if(state.cardsRaw && state.cardsRaw.length>0 && state.codes && state.codes.length>0 && state.members && state.members.length>0) {
        let data = {arr: state.cardsRaw, codes: state.codes, members: state.members, currentSprint: state.currentSprintId};
        let CountPerTOW = ServiceProvider.graphService.GetGraphForTOW(ServiceProvider.mapDataService.CardsGroupedByTypeOfWork(data));
        let CountPerAgency = ServiceProvider.graphService.GetGraphForTasksPerAgency(ServiceProvider.mapDataService.CardsGroupedByAgency(data));
        let CountPerCategory = ServiceProvider.graphService.GetGraphForCategory(ServiceProvider.mapDataService.CardsGroupedByCategory(data));
        let CountPerTool = ServiceProvider.graphService.GetGraphForTool(ServiceProvider.mapDataService.CardsGroupedByTool(data));
        let CountPerType = ServiceProvider.graphService.GetGraphForType(ServiceProvider.mapDataService.CardsGroupedByType(data));

        let newGraphs = [
            //CountPerTOW,
            CountPerAgency,
            CountPerCategory,
            CountPerTool,
            CountPerType
        ];

        let matchingTab = state.selectedGraph ? state.categoryTabs.list.find(t => t.value === state.selectedGraph.code) : state.categoryTabs.list[state.categoryTabs.activeIndex];

        commit('setCardList', ServiceProvider.mapDataService.CardsToDataTile(data));
        commit('setGraphList', newGraphs);
        commit('setCategoryFilter', matchingTab);
        commit('setSelectedGraph', state.selectedCategory.value ? newGraphs.find(g => g.code === state.selectedCategory.value) : newGraphs[0]);
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
      console.groupCollapsed(mut.type);
      console.log(mut);
      console.log(state);
      console.groupEnd();
      if(watchMuts.includes(mut.type)) {
        store.dispatch('updateAllGraphs');
      }
    });
  };
}