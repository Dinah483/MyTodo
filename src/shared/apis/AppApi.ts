import AppStore from "../stores/AppStore";
import TaskApi from "./TaskApi"; 

export const tasksPath = (
  category: "Tasks" 
): string => {
  // return `${"Todo/gd5XBPNiKRNx4pysyrZK"}/${category}`;
  return `${category}`
};

export const taskStatuses = (
  category: "statuses" 
): string => {
  // return `${"Todo/gd5XBPNiKRNx4pysyrZK"}/${category}`;
  return `${category}`
};

export default class AppApi {
 
  static tasks: TaskApi;
  task:TaskApi;
  
  constructor(store: AppStore) {
    AppApi.tasks = new TaskApi(this, store);
    this.task = new TaskApi(this, store);
  }
}
