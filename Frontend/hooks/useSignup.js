import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const { setAuthUser, authUser } = useAuthContext();
    const navigate = useNavigate();

    const signup = async ({ fullName, email, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullName, email, password, confirmPassword, gender });
        if (!success)
            {
            return;}

        setLoading(true);
        try {

            const res = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password, confirmPassword, gender })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg );
            }

            // Store user session
            localStorage.setItem("taskify", JSON.stringify(data));

         setAuthUser(data);

         if (res.ok) {
            setAuthUser(data);
            navigate('/dashboard');
        }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, email, password, confirmPassword, gender }) {
    if (!fullName || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords didn't match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");

        return false;
    }
    return true;
}