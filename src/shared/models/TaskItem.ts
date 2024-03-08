import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../stores/AppStore";

export type ITaskStatus = "todo" | "in-progress" | "done"

export const defaultTaskItem: ITaskItem = {
  taskId: "",
  taskName: "",
  DateDue: "",
  Status: "todo",
};

export interface ITaskItem {
  taskId: string;
  taskName: string;
  DateDue: string;
  Status: string;
}

export default class TaskItem {
  private task: ITaskItem;

  constructor(private store: AppStore, task: ITaskItem) {
    makeAutoObservable(this);
    this.task = task;
  }

  get asJson(): ITaskItem {
    return toJS(this.task);
  }
}