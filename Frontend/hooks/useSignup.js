import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser, authUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        console.log("Signup function called")
        console.log({fullName, username, password, confirmPassword, gender })
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success)
            {console.log("Validation failded")
            return;}

        setLoading(true);
        try {
            console.log("Sending request to backend..."); // ✅ Debugging line

            const res = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            const data = await res.json();
            console.log("RAW data:", data)

            if (!res.ok) {
                console.log("Server response:", data); // Debugging
                throw new Error(data?.error || "Signup failed. Please try again.");
            }

            // Store user session
            localStorage.setItem("taskify", JSON.stringify(data));
            console.log("Data in auth User from useSignup before updating : ",authUser);

         setAuthUser(data);
            console.log("Data in auth User from useSignup after updating : ",authUser);

        } catch (error) {
            toast.error(error.message);
            console.log("Error in signup:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all the fields");
        console.log("Please fill in all the fields")
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords didn't match");
        console.log("Passwords didn't match")
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        console.log("Password must be at least 6 characters long")

        return false;
    }
    return true;
}