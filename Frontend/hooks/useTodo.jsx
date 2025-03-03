import { useState } from "react";
import toast from "react-hot-toast";


const useTodo = () => {
    const [loading, setLoading] = useState(false);

    const addTodo =async ({title, description}) => {
        const success = handleInputErrors({title, description});
        if (!success){
            return 
        }
        setLoading(true);
        try {
            const res  = await fetch("http://localhost:3000/user/todo",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title, description}),
                credentials: "include"

            });
            const data = await res.json();
            if (!res.ok){
                throw new Error(data.msg)
            };
            console.log(data);

            
        } catch (error) {
            toast.error(error.message)
        }finally {
            setLoading(false)
        }

    }
    return {loading, addTodo}
}
export default useTodo;
function handleInputErrors ({title, description}){
    if (!title){
        toast.error("Title is required!")
        return false
    }
    return true
}