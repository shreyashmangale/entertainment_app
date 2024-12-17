import { createContext, useEffect, useState } from "react"
import axios from 'axios';

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        const res = await axios.post("http://localhost:5000/auth/login", inputs);
      //console.log(res)

        const token = res.data.token;
      //console.log(token)
        // Store token
        localStorage.setItem('access_token', token);

        setCurrentUser(res.data.userData);
    };

    const logout = async(inputs) => {
      //console.log("In logout")
        const response = await axios.post("http://localhost:5000/auth/logout");
      //console.log("logout response", response)

        localStorage.removeItem('access_token'); // or sessionStorage.removeItem('authToken');
        setCurrentUser(null);
    };


    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}