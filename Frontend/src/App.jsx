import React from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import LandingHome from "../Components/LandingHome";
import { AuthContextProvider } from "../context/AuthContext";
import Login from "../Components/Login";
import Signup from "../Components/Signup"
import { useAuthContext } from "../context/AuthContext";
import Dashboard from "../Components/Dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <><Toaster position="top-right" reverseOrder={false} />
        <div className="boundary">  
          
          <Routes>
              <Route path="/" element={authUser ? <Navigate to="/dashboard"/> :<LandingHome/>}/>
              <Route path="/login" element={authUser ? <Navigate to="/dashboard"/> : <Login/>}/>
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard"/> :<Signup/>}/>
              <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          
        </div>

    </>
  );
};

export default App;