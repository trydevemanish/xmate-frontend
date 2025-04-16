import React,{useState} from 'react'

const Sidebarmenuoptions = [
  {
    menu : 'leaderboard'
  },
  {
    menu : 'profile'
  },
  {
    menu : 'create your own game'
  }
]

type Sidebarmenuoptiontype = {
  menu : string
}

export default function Sidebar() {
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
              onClick={() => setSelectedOption(idx)}>
              {data?.menu}
            </p>
          ))}
        </div>
        <p className='text-center bg-violet-500 text-white shadow-lg shadow-violet-300 rounded-md py-2 w-full text-xs cursor-pointer font-bold font-manrope'>logout</p>
      </div>
  )
}
