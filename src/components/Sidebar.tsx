import React,{useState} from 'react'
import { Link } from 'react-router'

const Sidebarmenuoptions = [
  {
    menu : 'leaderboard'
  },
  {
    menu : 'create your own game'
  }
]

type Sidebarmenuoptiontype = {
  menu : string
}

export default function Sidebar({setClickedMenu}:{setClickedMenu : React.Dispatch<React.SetStateAction<string>>}) {
  const [selectedoption,setSelectedOption] = useState(null)

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
        <Link to={'/u/profile'}><p className='text-center outline-violet-500 py-2 text-xs outline rounded cursor-pointer w-full font-bold font-manrope hover:bg-violet-400 hover:text-white hover:outline-none'>Profile</p></Link>
         <p className='text-center bg-violet-500 text-white shadow-lg shadow-violet-300 rounded-md py-2 w-full text-xs cursor-pointer font-bold font-manrope'>logout</p>
        </div>
      </div>
  )
}
