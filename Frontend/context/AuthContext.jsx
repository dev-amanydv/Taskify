import {createContext, useContext, useState, useEffect} from 'react'



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
        } else {
            localStorage.removeItem("taskify")
        }
    },[authUser])
    return <AuthContext.Provider value={{authUser, setAuthUser}} >
        {children}
    </AuthContext.Provider>
}