import React,{ createContext, useContext, useEffect, useState } from "react"
import { useNavigate,useLocation } from "react-router";
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
    const location = useLocation()
    const token = localStorage.getItem('Accesstoken')
    const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL

    if(!ApiUrl){
        console.error('Env Variable Not loaded')
    }
 
    useEffect(() => {
        const { pathname } = location;

        // if user is offline then this message will pop up
        if(!navigator.onLine){
            console.log('User is offline- Failing in making req to Db')
            toast.dark('User is Offline trying to connect.. refresh the page')
        }

        if(token){
            setIsloggedIn(true)
        }

        if(!token){
            if(!pathname.startsWith('/challenge')){
                if(pathname == '/'){
                    navigate('/')
                } else if (pathname == '/u/practice'){
                    navigate('/u/practice')
                } else if (pathname == '/register'){
                    navigate('/register')
                } else {
                    navigate('/login')
                }
            } 
        } else {
            if(!pathname.startsWith('/u/profile') && !pathname.startsWith('/challenge') && !pathname.startsWith('/random')){
                if(pathname == '/'){
                    navigate('/')
                } else if (pathname == '/login') {
                    navigate('/login')
                } else  {
                    navigate('/dashboard')
                }
            }
        }

    },[token,navigate])

    const loginUser = async({email,password}:SigninFormValues) => {

        try {
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
                const errText = await response.json()
                if(errText.message == 'Failed to login User: User matching query does not exist.'){
                    toast.warning('Email Not vaild')
                    return
                }
                toast.warning(errText.message)
                return
            } 
    
            const data = await response.json()
    
            if(data?.message == 'Login successfully'){
                localStorage.setItem("Accesstoken",data?.access_token)
            }
    
            toast.success('login success')
            setIsloggedIn(true)
            navigate('/dashboard')

        } catch (error) {
            console.error(`Issue Occured while login: ${error}`)
            return;
        }
    }

    const logoutUser = async () => {
        try {

            localStorage.setItem('Accesstoken','')

            const response = await fetch(`${ApiUrl}/u/logout/`,{
                method : 'POST',
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
    
            if(!response.ok){
                const errText = await response.json()
                console.error(errText?.message)
                toast.warning(errText.message)
                return
            }
    
            toast.success('Logout success')
            setIsloggedIn(false)
            navigate('/login')

        } catch (error) {
            console.error(`Issue Faced while logging out: ${error}`)
            return
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