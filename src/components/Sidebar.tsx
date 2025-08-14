import React,{useState} from 'react'
import { Link } from 'react-router'
import { BiUserCircle } from 'react-icons/bi'
import { useAuth } from '../context/useContext'

const Sidebarmenuoptions = [
  {
    menu : 'leaderboard'
  },
  {
    menu : 'play with computer'
  },
  {
    menu : 'create your own match'
  },
  // {
  //   menu : 'total matches played till'
  // },
]

type Sidebarmenuoptiontype = {
  menu : string
}

export default function Sidebar({setClickedMenu}:{setClickedMenu : React.Dispatch<React.SetStateAction<string>>}) {
  const [selectedoption,setSelectedOption] = useState(null)
  const { logoutUser } = useAuth()
  

  return (
      <div className='flex flex-col px-2 py-2 justify-between min-h-screen'>
        <div className='flex flex-col gap-1 font-manrope text-sm'>
          {Sidebarmenuoptions.map((data:Sidebarmenuoptiontype,idx:any) => (
            <p 
              key={idx} 
              className={` text-xs text-start px-2 cursor-pointer py-1 rounded hover:bg-violet-400 hover:text-white
                 ${
                    selectedoption === idx ? 'bg-violet-200' : ''
                 }
              `} 
              onClick={
                () => {
                  setSelectedOption(idx)
                  setClickedMenu(data?.menu)
                }
              }>
              {data?.menu}
            </p>
          ))}
        </div>
        <div className='flex flex-col gap-2 '>
        <Link to={'/u/profile'}>
          <p className='text-center outline-violet-500 py-2 text-xs outline rounded cursor-pointer w-full font-bold font-manrope hover:bg-violet-400 hover:text-white hover:outline-none flex gap-1 justify-center items-center'>
            <span><BiUserCircle className='size-5 text-violet-500 ' /></span>
            <span>Profile</span>
          </p>
        </Link>
         <p className='text-center bg-violet-500 text-white shadow-lg shadow-violet-300 rounded-md py-2 w-full text-xs cursor-pointer font-bold font-manrope' onClick={logoutUser}>logout</p>
        </div>
      </div>
  )
}
