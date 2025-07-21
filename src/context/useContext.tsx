import React,{ createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { SigninFormValues } from '../types/types'
import { toast } from "react-toastify";

type defaultContextValue = {
    isLoggedIn:boolean;
    loginUser: ({email,password}:SigninFormValues) => void
    logoutUser: () => void
    token:string|null;
}

const defaultValue: defaultContextValue = {
    isLoggedIn: false,
    loginUser: () => {},
    logoutUser: () => {},
    token: '',
};

const AuthContext = createContext<defaultContextValue>(defaultValue)

const AuthProvider= ({children}:{children:React.ReactElement}) => {
    const [isLoggedIn,setIsloggedIn] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('Accesstoken')
    const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL

    if(!ApiUrl){
        console.error('Env Variable Not loaded')
    }
 
    useEffect(() => {
        if(token){
            navigate('/dashboard')
        } else {
            console.log('UnAuthorisied User')
        }
    },[token,navigate])

    const loginUser = async({email,password}:SigninFormValues) => {

        const response = await fetch(`${ApiUrl}/u/login/`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                email : email,
                password : password
            })
        })

        if(!response.ok){
          throw new Error(await response.text())
        } 

        const data = await response.json()

        console.log("Response",data)

        if(data?.message == 'Login successfully'){
            localStorage.setItem("Accesstoken",data?.access_token)
            localStorage.setItem("refreshToken",data?.refresh_token)
        }

        toast.success('login success')
        setIsloggedIn(true)
        navigate('/dashboard')
    }

    const logoutUser = async () => {
        try {
            const response = await fetch(`${ApiUrl}/u/logout/`,{
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
    
            if(!response.ok){
                throw new Error(await response.text())
            }
    
            toast.success('Logout success')
            setIsloggedIn(false)
            navigate('/login')

        } catch (error) {
            console.error(`Issue Faced while logging out: ${error}`)
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn,loginUser,logoutUser,token }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
   return useContext(AuthContext);
}

export { 
    AuthProvider,
    useAuth
}