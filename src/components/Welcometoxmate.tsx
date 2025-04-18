import WelcomImage from '../assets/Welcomimage2.jpg'

export default function Welcometoxmate({setClickedMenu}:{setClickedMenu : React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <div className='grid grid-cols-2'>
      <div className='col-start-1 col-end-2'>
        <img src={WelcomImage} alt="welcomimage" className='min-w-full max-h-screen object-cover' />
      </div>
      <div className='col-start-2 col-end-3 bg-gradient-to-b from-white via-violet-200 to-white flex flex-col gap-3 justify-center items-center'>
        <p className='text-center text-xl font-manrope'>
          <span>Welcome to</span>
          <span className='font-bold text-violet-500'> xMate!</span>
        </p>
        <p className='text-xs font-semibold'>Challenge, Compete, Conquer – Play Chess with Friends!</p>
        <p className='text-xs px-12'>Welcome to <span className='font-bold font-manrope text-violet-500'>xMate</span> , a fun and interactive online chess platform built for everyone – you can challenge your friends or peers to thrilling chess matches, track your progress, and climb the leaderboard to prove your skills. Whether you're here to challenge or just have fun, <span className='font-bold font-manrope text-violet-500'>xMate</span> makes it easy to play, compete, and connect.</p>
        <button className='bg-violet-500 text-xs text-white font-manrope font-semibold
         px-10 py-2 rounded shadow shadow-violet-300' onClick={() => setClickedMenu('create your own game')}>create your new match.</button>
        <p className='font-manrope text-xs hover:underline hover:underline-offset-4 font-bold cursor-pointer' onClick={() => setClickedMenu('leaderboard')}>Check leaderBoard stats.</p>
      </div>
    </div>
  )
}
  