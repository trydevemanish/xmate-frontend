import { useForm } from "react-hook-form"
import { SignupFormValues } from "../../types/types"
import { GiChessBishop } from "react-icons/gi"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../context/useContext"
import { toast } from "react-toastify"
import { useState } from "react"

export default function Register() {
    const { register, handleSubmit} = useForm<SignupFormValues>()
    const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_UR
    const { token } = useAuth()
    const navigate = useNavigate()
    const [loading,setloading] = useState(false)
    if(!token || token == null){
        console.log('Token value is null')
        return;
    }

    const onSubmit = handleSubmit(async(data : SignupFormValues) => {
        try {
            setloading(true)
            const res = await fetch(`${ApiUrl}/u/register`,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body : JSON.stringify({
                    username:data.username,
                    email:data.email,
                    password:data.password 
                })
            })
    
            if(res.ok){
                console.error(await res.text())
            }
    
            const registerUserData = await res.json()
            if(registerUserData){console.error(await res.text())}
    
            toast.success(await registerUserData?.message)
            console.log('User registered')
            navigate('/login')

        } catch (error:any) {
            console.error(`Issue Occured While registering User: ${error?.message}`)
        } finally {
            setloading(false)
        }
    })

  return (
    <div className="text-xl font-manrope line-clamp-4 py-8 flex flex-col gap-2 min-h-screen items-center justify-center">
        <div className="flex gap-2 items-center">
            <GiChessBishop  className="size-6 text-violet-500"/>
            <p className="font-bold">Welcome to</p> 
            <p className="text-purple-600 font-yatraone text-3xl">xMate</p>
        </div>
        <p className="text-sm font-semibold opacity-60 pb-2">Enter the Register field.</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 text-base py-4">
            <div className="flex flex-col gap-3">
                <label>FullName</label>
                <input {...register("username")} type="email" className="min-w-72 py-[5px] text-sm border border-black rounded focus:outline-none px-2"/>
            </div>
            <div className="flex flex-col gap-3">
                <label>Email</label>
                <input {...register("email")} type="email" className="min-w-72 py-[5px] text-sm border border-black rounded focus:outline-none px-2"/>
            </div>
            <div className="flex flex-col gap-3">
                <label>Password</label>
                <input {...register("password")} type="password" className="min-w-72 py-[5px] text-sm border border-black rounded focus:outline-none px-2" />
            </div>
            <div className="py-8">
                <button type="submit" className="w-full py-1 bg-violet-600 text-white rounded shadow-md shadow-violet-400 ">
                    {
                        loading ? 
                        (
                          <p>Wait Registering <span className="animate-bounce duration-300 transition-all">...</span></p>  
                        ) 
                        :
                        'Register'
                    }
                </button>
                <p className="text-sm text-center py-4">Already a member of xMate? <Link to={'/login'} className="text-blue-600" >Login</Link></p>
            </div>
        </form>
    </div>
  )
}
