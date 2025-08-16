import { BiSidebar } from 'react-icons/bi'
import WelcomImage from '../assets/Welcomimage2.jpg'

type props = {
  setClickedMenu : React.Dispatch<React.SetStateAction<string>>,
  setShowSidebar : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Welcometoxmate({setClickedMenu,setShowSidebar}:props) {
  return (
    <div className='md:grid md:grid-cols-2 max-h-screen'>
      <div className='xs:hidden xs:invisible md:visible md:block md:col-start-1 md:col-end-2'>
        <img src={WelcomImage} alt="welcomimage" className='min-w-full min-h-screen max-h-screen' />
      </div>

      <div className='md:col-start-2 md:col-end-3 bg-gradient-to-b from-white via-violet-200 to-white'>

        <BiSidebar className='size-9 py-2 xs:visible xs:block md:hidden md:invisible' onClick={() => setShowSidebar(prev => !prev)} />

        <div className='flex flex-col gap-6 justify-center items-center min-h-[calc(97vh-4rem)]'>
          <p className='text-center text-xl font-manrope'>
            <span>Welcome to</span>
            <span className='font-bold text-violet-500'> xMate!</span>
          </p>
          <p className='xs:text-lg md:text-xs text-center font-semibold'>Challenge, Compete, Conquer – Play Chess with Friends!</p>
          <p className='xs:text-base md:text-xs px-12'>Welcome to <span className='font-bold font-manrope text-violet-500'>xMate</span> , a fun and interactive online chess platform built for everyone – you can challenge your friends or peers to thrilling chess matches, track your progress, and climb the leaderboard to prove your skills. Whether you're here to challenge or just have fun, <span className='font-bold font-manrope text-violet-500'>xMate</span> makes it easy to play, compete, and connect.</p>
          <button className='bg-violet-500 xs:text-base md:text-xs text-white font-manrope font-semibold
          px-10 py-2 rounded shadow shadow-violet-300' onClick={() => setClickedMenu('create your own match')}>create your new match.</button>
          <p className='font-manrope xs:text-base md:text-xs hover:underline hover:underline-offset-4 font-bold cursor-pointer' onClick={() => setClickedMenu('leaderboard')}>Check leaderBoard stats.</p>
        </div>
      </div>
    </div>
  )
}
  