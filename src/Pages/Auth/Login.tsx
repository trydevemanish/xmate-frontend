import { useForm } from "react-hook-form"
import { SigninFormValues } from "../../types/types"
import { GiChessBishop } from "react-icons/gi"
import { Link } from "react-router"
import { useState } from "react"
import { useAuth } from '../../context/useContext.tsx'

export default function Login() {
    const { register , handleSubmit} = useForm<SigninFormValues>()
    const [loading,setloading] = useState(false)
    const { loginUser } = useAuth()

    const onSubmit = handleSubmit(async(data : SigninFormValues) => {
        try {
            setloading(true)
            loginUser(data)
            
        } catch (error:any) {
            console.error(`Issue faced while user login: ${error.message}`)
            throw new Error(`Issue faced while user login: ${error.message}`)
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
        <p className="text-sm font-semibold opacity-60">Enter the login field.</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 text-base py-4">
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
                          <p>Wait loging <span className="animate-bounce duration-300 transition-all">...</span></p>  
                        ) 
                        :
                        'login'
                    }
                </button>
                <p className="text-sm text-center py-4">New to xMate? <Link to={'/register'} className="text-blue-600" >Register</Link></p>
            </div>
        </form>
    </div>
  )
}


