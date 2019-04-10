import DataService from "./DataService";
import MapDataService from './MapDataService';
import GraphService from './GraphService';
import ExcelService from './ExcelService';
export default class ServiceProvider {
  public static dataService = new DataService();
  public static mapDataService = new MapDataService();
  public static graphService = new GraphService();
  public static excelService = new ExcelService();
}
