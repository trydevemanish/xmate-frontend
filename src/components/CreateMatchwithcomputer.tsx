import React, { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaComputer } from 'react-icons/fa6'
import { useNavigate } from 'react-router'

const gamelevel = [
    {
        text : 'easy',
        emoji : '😀'
    },
    {
        text : 'medium',
        emoji : '😣'
    },
    {
        text : 'hard',
        emoji : '😵'
    },
]

export default function CreateMatchwithcomputer() {
    const [selectedLevel,setSelectedLevel] = useState(0)
    const [loading,setloading] = useState(false)
    const navigate = useNavigate();

    async function handleCreateMatch() {
        setloading(true)
        console.log('hello')  

        navigate('/random/match')

        setTimeout(() => {
            setloading(false) 
        }, 2000);
    }

  return (
    <div className='mt-5'>
      <div className='flex items-center justify-center gap-1'>
        <p className='text-center text-base font-manrope font-semibold'>Create a match with computer</p>
        <FaComputer className='size-4 text-violet-500' />
      </div>
      <div className='flex flex-col items-center justify-center mt-10 font-manrope min-h-[calc(97vh-10rem)]'>
        <p className='font-bold'>Choose level.</p>
        <div className='flex flex-row gap-4 items-center mt-5'>
            {gamelevel.map((data,idx) => (
                <div 
                key={idx} 
                className={`flex flex-col items-center justify-center px-4 py-1 rounded-lg cursor-pointer
                    ${selectedLevel === idx ? 'bg-[#B58863]' : 'bg-[#f0d9b5]'}
                `} onClick={() => setSelectedLevel(idx)}>
                    <p>{data?.text}</p>
                    <p>{data?.emoji}</p>
                </div>
            ))}
        </div>
        <div className='mt-5'>
            <p className="bg-violet-500 px-10 py-2 text-xs rounded shadow-lg shadow-violet-200 text-white font-semibold font-manrope cursor-pointer" onClick={handleCreateMatch}>
            {!loading ? <span>Start the game!</span> : <span className='flex justify-center gap-3 items-center'>
                <CgSpinner className='size-4 animate-spin' />
                <span>Starting</span>
            </span> }
            </p>
        </div>
      </div>
    </div>
  )
}
