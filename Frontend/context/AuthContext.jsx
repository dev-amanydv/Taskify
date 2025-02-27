import {createContext, useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';



export const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext)
} 

export const AuthContextProvider = ({children}) => {
    const storedUser = localStorage.getItem("taskify")
    const [authUser, setAuthUser] = useState(storedUser ? JSON.parse(storedUser) : null);

    useEffect(()=> {
        if (authUser){
            localStorage.setItem("taskify", JSON.stringify(authUser))
            console.log("Data in auth user from authContext.jsx: ", authUser); 
            

        } else {
            localStorage.removeItem("taskify")
        }
    },[authUser])
    return <AuthContext.Provider value={{authUser, setAuthUser}} >
        {children}
    </AuthContext.Provider>
}