import { BsUniversalAccessCircle } from 'react-icons/bs'
import AboutImage from '../../assets/aboutimage.jpg'
import { GiCrocSword } from 'react-icons/gi'

export default function About() {
  return (
    <div className="xs:px-20 md:px-28 py-2">
      <div className='flex xs:flex-col xs:items-center md:flex-row md:justify-between xs:px-4 md:px-12 py-1 gap-10'>
        <img src={AboutImage} alt="aboutimg" className='w-[21rem] max-w-[30rem] h-[20rem] max-h-[30rem] rounded-md shadow-xl shadow-violet-200'/>
        <div>
            <p className='text-3xl flex flex-col gap-2 pt-6'>
              <span className='font-yatraone'>Where Strategy Meets <span className='text-violet-500'>Fun</span> </span>
              <span className='text-xl text-purple-500 opacity-80 font-manrope'> – Play Chess Like Never Before!</span>
            </p>
            <div className='grid grid-cols-3 gap-4 py-8 xs:text-center md:px-10'>
              <p className='col-start-1 col-  end-2 border-r-2 text-center flex items-center gap-2'>
                <BsUniversalAccessCircle className='size-8 text-violet-500'/>
                <span>Peer-to-Peer <span className='font-yatraone text-violet-500'>Challenges</span></span>
              </p>
              <p className='col-start-2 col-end-3 border-r-2 text-center'>Real-Time Gameplay</p>
              <p className='col-start-3 col-end-4 text-center flex items-center gap-2'>
                <GiCrocSword className='size-10 text-violet-500'/>
                <span><span className='font-yatraone text-violet-500'>Leaderboard</span> Glory</span>
              </p>
            </div>
            <p className='leading-8 text-sm font-manrope'>No complicated setup—just create a game, share the link, and start playing. Perfect for quick matches or long <span className='font-cabinsketch text-base text-violet-500'>strategic battles</span>.</p>
        </div>
      </div>
    </div>
  )
}
