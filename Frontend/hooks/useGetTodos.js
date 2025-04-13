import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";



export const useGetTodos = () =>{
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext()
    const getTodos =async ()=>{
        setLoading(true);
        try {
            console.log("authUser:",authUser)
            const response = await fetch("http://localhost:3000/user/todos",{
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${authUser.jwt}`
                },
            });
            const data = await response.json();
        return data.todos
        } catch (error) {
            console.log("Error in useGetTodos: ", error);
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return {loading, getTodos}
}

export const useCreateTodo = () =>{
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const createTodo = async (title) => {
        console.log("title recieved to createTodo: ", title);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/user/todo`,{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${authUser.jwt}`
                },
                body: JSON.stringify({ title })

            });
            const data = await res.json();
            console.log("Response from createTodos: ", data)

            return data
        } catch (error) {
            console.log("Error in createTodo :", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, createTodo}
}


export const useUpdateTodo = () =>{
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const updateTodo = async (id, title, isCompleted) => {
        console.log("Id recieved to updateTodo: ", id);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/user/todo/${id}`,{
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${authUser.jwt}`
                },
                body: JSON.stringify({ title, isCompleted })

            });
            const data = await res.json();
            console.log("Response from updateTodos: ", data)

            return data.todo
        } catch (error) {
            console.log("Error in updateTodo :", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, updateTodo}
}

export const useDeleteTodo = () =>{
    const [loading, setLoading] = useState(false);
    const {authUser} = useAuthContext();
    const deleteTodo = async (id) => {
        console.log("Id recieved to updateTodo: ", id);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/user/todo/${id}`,{
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${authUser.jwt}`
                },
            });
            const data = await res.json();
            console.log("Response from deleteTodos: ", data)

            return data
        } catch (error) {
            console.log("Error in deleteTodo :", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, deleteTodo}
}