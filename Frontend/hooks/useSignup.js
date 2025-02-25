import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        console.log("Signup function called")
        console.log({fullName, username, password, confirmPassword, gender })
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success)
            console.log("Validation failded")
            return;

        setLoading(true);
        try {
            console.log("Sending request to backend..."); // ✅ Debugging line

            const res = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            });

            const data = await res.json();

            if (!res.ok) {  // ✅ Check HTTP errors
                throw new Error(data.error || "Signup failed. Please try again.");
            }

            // Store user session
            localStorage.setItem("taskify", JSON.stringify(data));
            setAuthUser(data);
            console.log("Signup successful:", data);

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