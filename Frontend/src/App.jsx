import React from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import LandingHome from "../Components/LandingHome";
import Login from "../Components/Login";
import Signup from "../Components/Signup"
import { useAuthContext } from "../context/AuthContext";
import Dashboard from "../Components/Dashboard";
import { Toaster } from "react-hot-toast";
import Tasks from "../Components/Tasks";
import './App.css';
import './index.css';


const App = () => {
  const {authUser} = useAuthContext();
  return (
    <><Toaster position="top-right" reverseOrder={false} />
        <div className="">  
          
          <Routes>
              <Route path="/" element={authUser ? <Navigate to="/dashboard"/> :<LandingHome/>}/>
              <Route path="/login" element={authUser ? <Navigate to="/dashboard"/> : <Login/>}/>
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard"/> :<Signup/>}/>
              <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/tasks" element={authUser ? <Tasks/> : <Navigate to="/login" />}/>
            </Routes>
          
        </div>

    </>
  );
};

export default App;