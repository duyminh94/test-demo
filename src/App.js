// import { Suspense } from "react";
import { Route,  Routes } from "react-router-dom";
import AuthLayout from "./Components/AuthLayout";
import Login from "./Modules/Auth/Login";
import Regsiter from "./Modules/Auth/Regsiter";

// import router from "./Routers/router";
function App() {
  return (
    // <Suspense>
    //   <RouterProvider router={router} />
    // </Suspense>
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter/>} />
      </Routes>
    </>
  );
}

export default App;
