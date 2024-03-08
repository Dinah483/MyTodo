import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { USER_ROLES } from "./shared/functions/CONSTANTS";
import { AppContext, useAppContext } from "./shared/functions/Context";
import AppApi from "./shared/apis/AppApi";
import AppStore from "./shared/stores/AppStore";
import UiStore from "./shared/stores/UiStore";
import Loading from "./shared/components/loading/Loading";

import PrivateRoute from "./shared/functions/PrivateRoute";
import "./App.scss";
import { TodoList } from "./shared/components/ToDoList";


const PrivateLoggedIn = () => (
  <PrivateRoute>
    <Suspense fallback={<Loading fullHeight={true} />}>
    </Suspense>
  </PrivateRoute>
);
const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="c" element={<PrivateLoggedIn />}>
          {/* OVERVIEW */}
          {/* <Route path="home/dashboard" element={<Dashboard />} /> */}
        </Route>

        <Route path="/" element={<TodoList />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};



const App = () => {
  const store = new AppStore();
  const api = new AppApi(store);
  const ui = new UiStore();

  return (
    <div className="app">
      <AppContext.Provider value={{ store, api, ui }}>
        <MainRoutes />
      </AppContext.Provider>
    </div>
  );
};

export default App;