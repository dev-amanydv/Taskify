import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = async () => {
    const [loading, setLoading ] = useState(false);
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
            console.log("reached logout");
            localStorage.removeItem("taskify");
            setAuthUser(null);
            console.log("logout clicked")
            
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return {loading, logout}
}
export default useLogout; 