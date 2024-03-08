import { MouseEventHandler, useEffect, useState } from "react";
import { ITaskItem, defaultTaskItem } from "../models/TaskItem";
import { observer } from "mobx-react-lite";
import { useAppContext } from "../functions/Context";

export const TodoList = observer(() => {
  //use observer to access all app api's and stores
  const { api, store } = useAppContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [task, setTask] = useState<ITaskItem>({ ...defaultTaskItem });
  const [searchName, setSearchName] = useState<string>("");

  const taskList = store.taskItem.all;

  const saveATask = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const taskItem: ITaskItem = {
      taskId: "",
      taskName: task.taskName,
      DateDue: task.DateDue,
      Status: task.Status,
    };

    try {
      if (store.taskItem.selected) {
        //update
        await api.task.update(task);
      } else {
        //new task
        await api.task.create(taskItem);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTask({ ...defaultTaskItem });
      setIsLoading(false);
    }
  };

  const editTask = async (task: ITaskItem) => {
    const _task = store.taskItem.select(task);
  };

  const deleteTask = async (task: ITaskItem) => {
    
    await api.task.delete(task);
  };

  //loads data onto the store on load of page
  useEffect(() => {
    const getData = async () => {
      await api.task.getAll();
    };
    getData();
  }, []);

  useEffect(() => {
    if (store.taskItem.selected) {
      setTask(store.taskItem.selected);
    } else setTask({ ...defaultTaskItem });

    return () => {}; // clean up something
  }, [store.taskItem.selected]);

  //searching
  const filteredTask = taskList.filter((task) =>
    task.asJson.taskName.toLowerCase().includes(searchName.toLowerCase())
  );


  //add status, a dropdown that says "To Do, Completed, In process"
  return (
    <div className="uk-container uk-flex-middle uk-card uk-card-body uk-width-1-3">
      <form onSubmit={saveATask} className="uk-flex-center">
        <h1 className="uk-heading-medium uk-text-center uk-flex-center">
          To-Do List
        </h1>
        <div className="uk-margin">
          <input
            type="text"
            className="uk-input"
            value={task.taskName}
            onChange={(e) => setTask({ ...task, taskName: e.target.value })}
            placeholder="Add a new to-do"
          />
        </div>
        <div className="uk-margin">
          <input
            type="date"
            className="uk-input"
            value={task.DateDue}
            onChange={(e) => setTask({ ...task, DateDue: e.target.value })}
            placeholder="Add a Due Date"
          />
        </div>
        <select
          id="task-status"
          className="uk-select"
          name="status"
          onChange={(e) => setTask({ ...task, Status: e.target.value })}
          value={task.Status}
        >
          <option value={"todo"}>To Do</option>
          <option value={"in-progress"}>In Progress</option>
          <option value={"done"}>Done</option>
        </select>
        <div className="uk-flex">
          <button
            className="uk-button-small uk-button-primary uk-width-1 uk-margin "
            type="submit"
          >
            {isLoading ? <p>loading</p> : <p className="">Add</p>}
          </button>
          <button
            className="uk-button-small uk-button-secondary uk-width-1-3 uk-flex-center"
            style={{ height: "49.78px" }}
          >
            Update
          </button>
        </div>
      </form>

      <div className="uk-flex-center">
        <div className="uk-margin-top uk-margin-left">
          <input
            placeholder="SEARCH TASK"
            className="uk-input"
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
          />
          <table className="uk-table uk-table-middle uk-table-divider uk-margin-large-top">
            <thead>
              <tr>
                <th>Name</th>
                <th>due date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTask.map((list) => (
                <tr key={list.asJson.taskId}>
                  <td>{list.asJson.taskName}</td>
                  <td>{list.asJson.DateDue}</td>
                  <td>{list.asJson.Status}</td>
                  <td>
                    <button
                      className="uk-button-small uk-margin"
                      onClick={() => deleteTask(list.asJson)}
                    >
                      Delete
                    </button>
                    <button
                      className="uk-button-small uk-margin"
                      onClick={() => editTask(list.asJson)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {taskList.length <= 0 && <p style={{ color: "red" }}>no task</p>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
