import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import {
  LoadingProvider,
} from "./Components/Loading/loading.context";

const AuthLayout = lazy(() => import("./Components/AuthLayout"));
const Login = lazy(() => import("./Modules/Auth/Login"));
const Regsiter = lazy(() => import("./Modules/Auth/Regsiter"));
const JiraLayout = lazy(() => import("./Components/JiraLayout/JiraLayout"));
const Board = lazy(() => import("./Components/JiraPage/Board"));
const UserManager = lazy(() => import("./Modules/UserManager"));
const Error404 = lazy(() => import("./Components/Error/Error404"));

function App() {
  return (
    <>
      <Suspense fallback={<LoadingProvider/>}>
        
          <Routes>
            <Route path="/" element={<AuthLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />

            <Route path="admin" element={<JiraLayout />}>
              <Route path="board" element={<Board />} />
              <Route path="usermanagement" element={<UserManager />} />
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
       
      </Suspense>
    </>
  );
}

export default App;
