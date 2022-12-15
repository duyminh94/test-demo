import { Route,  Routes } from "react-router-dom";
import AuthLayout from "./Components/AuthLayout";
import Error404 from "./Components/Error/Error404";
import JiraLayout from "./Components/JiraLayout/JiraLayout";
import Board from "./Components/JiraPage/Board";
import Login from "./Modules/Auth/Login";
import Regsiter from "./Modules/Auth/Regsiter";
import UserManager from "./Modules/UserManager";



function App() {
  return (
   
    <>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Regsiter/>} />

        <Route path="admin" element={<JiraLayout/>}>
          <Route path="board" element={<Board/>}/>
          <Route path="usermanagement" element={<UserManager/>}/>
        </Route>

        <Route path="*" element={<Error404/>}/>
        
      </Routes>
      
    </>
    
    
  );
}

export default App;
