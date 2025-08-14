import InfoImage from '../../assets/headerimg1.png'
import smallImage from '../../assets/scroll7.avif'

export default function Info() {
  return (
    <div className="bg-violet-300">
        <div className="xs:px-20 md:px-32 py-16 xs:flex xs:flex-col xs:gap-16 md:grid md:grid-cols-2"> 
            <div className='md:col-start-1 md:col-end-2'>
                <img src={InfoImage} alt="infoImage" className='min-w-80 xs:w-[20rem] md:w-[25rem] max-w-[26rem] object-cover min-h-64 h-72 max-h-[24rem] rounded hover:-translate-y-1  hover:transform-gpu hover:duration-300'/>
            </div>
            <div className='col-start-2 col-end-3 flex flex-col'>
                <p className='font-yatraone text-white text-2xl'>Challenge Your Friends to a Game of Chess – Anytime, Anywhere!</p>
                <p className='font-manrope font-semibold leading-6 text-xs'>Welcome to ChessMate , a fun and interactive online chess platform built for everyone – from coding enthusiasts and students to professional players! With ChessMate, you can challenge your friends or peers to thrilling chess matches, track your progress, and climb the leaderboard to prove your skills. </p>
                <div className='flex items-end xs:py-8 md:py-0 justify-between'>
                    <button className='bg-violet-600 text-white py-2 px-16 rounded shadow-md shadow-violet-300 hover:bg-violet-500 '>Create your first match.</button>
                    <img src={smallImage} alt="secondImage" className='xs:invisible xs:hidden md:min-w-28 md:w-32 md:max-w-96 md:rounded-md md:shadow-md md:shadow-violet-300' />
                </div>
            </div>
        </div>
    </div>
  )
}