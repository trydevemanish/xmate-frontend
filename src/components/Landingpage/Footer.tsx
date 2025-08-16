import { MdEmail } from 'react-icons/md'
import Icon from '../../assets/chessicon.png'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <div className='pt-8 pb-2'>
      <div className='flex xs:flex-col md:flex-row md:px-36 xs:gap-4 md:gap-0 md:justify-between'>
        <section>
            <div className='flex items-center gap-4'>
              <img src={Icon} alt="logo" className='size-8' />
              <div>
                <p className="font-yatraone">Challenge Friends, Beat Rivals, Rule the Leaderboard!</p>
                <p className='font-yatraone text-violet-600'>Strategize. Dominate. Celebrate !</p>
              </div>
            </div>
            <div className='py-8 xs:px-4 md:px-0'>
              <p className='bg-violet-600 px-10 py-1 rounded text-white inline-block shadow-lg cursor-pointer shadow-violet-300 '>
                <Link to={'/dashboard'}>Get started !</Link>
              </p>
              <p className='md:text-xs xs:text-base pt-4'>Created by -me (Manish ✍).</p>
            </div>
        </section>
        <section>
          <div className='flex flex-col xs:text-base xs:px-6 md:px-0 md:text-xs font-bold font-manrope gap-4 pt-4'>
            <p className='hover:underline hover:underline-offset-2'>
              <Link to={'/dashboard'}>leaderboard !</Link>
            </p>
            <p className='hover:underline hover:underline-offset-2'>Features</p>
            <p className='flex gap-2 items-center'>
              <MdEmail className='size-6 text-violet-600' />
              <span className='hover:underline hover:underline-offset-2 cursor-pointer'>manishvsharma1@gmail.com</span>
            </p>
          </div>
        </section>
      </div>
      <div className='py-0 my-0 md:visible md:block xs:invisible xs:hidden'>
        <p className='xs:text-[8rem] md:text-[12rem] w-full font-bold text-right opacity-10'>xMate</p>
      </div>
    </div>
  )
}
