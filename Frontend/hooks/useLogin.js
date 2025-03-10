import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authUser } = useAuthContext();
    const navigate = useNavigate();

    
    const login = async (username,password) => {
        const success = handleInputErrors(username,password);
        if (!success){
            return 
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/user/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
            const data = await res.json();
            if (data.msg){
                throw new Error(data.msg)
            };
            
            localStorage.setItem("taskify", JSON.stringify(data));
            if (res.ok) {
                setAuthUser(data);
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.message);
        }finally {
            setLoading(false)
        }

    }
    return {loading, login};
}
export default useLogin;

function handleInputErrors (username,password){
    if (!username || !password){
        toast.error("Please fill in all the fields");
        return false
    }
    return true;

}