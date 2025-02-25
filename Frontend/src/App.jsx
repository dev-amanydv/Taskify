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

const App = () => {
  const {authUser} = useAuthContext();
  return (
    <>
        <div className="boundary">  
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={authUser ? <Dashboard/> :<LandingHome/>}/>
              <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>}/>
              <Route path="/signup" element={authUser ? <Navigate to="/"/> :<Signup/>}/>
            </Routes>
          </AuthContextProvider>
          
        </div>

    </>
  );
};

export default App;