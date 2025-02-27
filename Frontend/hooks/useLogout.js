import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useLogout =  () => {
    const [loading, setLoading ] = useState(false);
    const navigate = useNavigate();
    const {setAuthUser} = useAuthContext();
    const logout = async ()=> {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/user/logout",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json();
            if (data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("taskify");
            setAuthUser(null);
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, logout}
}
export default useLogout; 