import {
  query,
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  Unsubscribe,
} from "@firebase/firestore";
import { db } from "../config/firebase-config";
import { ITaskItem } from "../models/TaskItem";
import AppStore from "../stores/AppStore";
import AppApi,{taskStatuses, tasksPath} from "./AppApi";



export default class TaskApi {
  constructor(private api: AppApi, private store: AppStore) {}

   getpath() {
    return tasksPath("Tasks");
}
  async getAll() {
    // get the db path
    const path = this.getpath();
    if (!path) return;

    // remove all items from store
    this.store.taskItem.removeAll();

    // create the query
    const $query = query(collection(db, path)); // query

    // new promise
    return await new Promise<Unsubscribe>((resolve, reject) => {
      // on snapshot
      const unsubscribe = onSnapshot(
        $query,
        // onNext
        (querySnapshot) => {
          const items: ITaskItem[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as unknown as ITaskItem);
          });

          this.store.taskItem.load(items);
          resolve(unsubscribe);
        },
        // onError
        (error) => {
          reject(error);
        }
      );
    });
  }

  // async getById(id: string) {
  //   const path = this.getpath();
  //   if (!path) return;

  //   const unsubscribe = onSnapshot(doc(db, path, id), (doc) => {
  //     if (!doc.exists) return;
  //     const item = { id: doc.id, ...doc.data() } as unknown as ITaskItem;

  //     this.store.taskItem.load([item]);
  //   });

  //   return unsubscribe;
  // }

  // create task
  async create(item: ITaskItem) {
    const path = this.getpath()
    if (!path) return;

    const itemRef = doc(collection(db, path));
    item.taskId = itemRef.id;

    // create in db
    try {
      await setDoc(itemRef, item, {
        merge: true,
      });
      // create in store
      this.store.taskItem.load([item]);
    } catch (error) {
      // console.log(error);
    }
  }

  // update item
  async update(item: ITaskItem) {
    const path = this.getpath();
    if (!path) return;

    // update in db
    try {
      await updateDoc(doc(db, path, item.taskId), {
        ...item,
      });
      // update in store
      this.store.taskItem.load([item]);
    } catch (error) {
      // console.log(error);
    }
  }

  // delete task
  async delete(item: ITaskItem) {
    const path = this.getpath();
    if (!path) return;

    // remove from db
    try {
      await deleteDoc(doc(db, path, item.taskId));
      // remove from store
      this.store.taskItem.remove(item.taskId); // Remove from memory
      // await this.api.folder.delete(item.id); // delete root folder
    } catch (error) {
      // console.log(error);
    }
 }
}
