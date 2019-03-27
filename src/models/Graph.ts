import { GraphTypes } from './GraphTypes';

export default class Graph {
  code: GraphTypes;
  config: Chart.ChartConfiguration = {};

  constructor(init: Partial<Graph>) {
    Object.assign(this, init);
  }
}
