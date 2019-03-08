import DataService from "./DataService";
import MapDataService from './MapDataService';
import GraphService from './GraphService';
export default class ServiceProvider {
  public static dataService = new DataService();
  public static mapDataService = new MapDataService();
  public static graphService = new GraphService();
}
