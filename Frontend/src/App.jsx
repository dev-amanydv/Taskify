import React from "react";
import { Navigate, Routes, Route} from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./App.css"
import Footer from "../Components/Footer";
import LandingHome from "../Components/LandingHome";
import { AuthContextProvider } from "../context/AuthContext";
import Login from "../Components/Login";
import Signup from "../Components/Signup"
import { useAuthContext } from "../context/AuthContext";
import Dashboard from "../Components/Dashboard";

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <>
        <div className="boundary">  
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={authUser ? <Navigate to="/dashboard"/> :<LandingHome/>}/>
              <Route path="/login" element={authUser ? <Navigate to="/dashboard"/> : <Login/>}/>
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard"/> :<Signup/>}/>
              <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </AuthContextProvider>
          
        </div>

    </>
  );
};

export default App;