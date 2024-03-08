import Store from "./Store";
import AppStore from "./AppStore";
import { runInAction, toJS } from "mobx";
import TaskItem, { ITaskItem } from "../models/TaskItem";

export default class ITaskItemSore extends Store<ITaskItem, TaskItem> {
    items = new Map<string, TaskItem>();
  static allTasks: any;
  static department: any;
  
    constructor(store: AppStore) {
      super(store);
      this.store = store;
    }
    
    load(items: ITaskItem[]) {
      runInAction(() => {
        items.forEach((item) =>
          this.items.set(item.taskId, new TaskItem(this.store, item))
        );
      });
    }
    getByTaskId(taskId: string) {
        const all = Array.from(this.items.values());
        return all
          .filter((item) => item.asJson.taskId === taskId);
  }

  getByDate(dateDue: string) {
    const all = Array.from(this.items.values());
    const tasksByDate = all
      .filter((item) => item.asJson.DateDue === dateDue)
      
    return tasksByDate;
  }

  getByStatus(status: string) {
    const all = Array.from(this.items.values());
    const tasksByStatus = all
      .filter((item) => item.asJson.Status=== status)
      
    return tasksByStatus;
  }

  get allTasks() {
    return Array.from(toJS(this.items.values()));
  }
  }
  
