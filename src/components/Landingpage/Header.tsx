import { FaChessRook } from "react-icons/fa"
import HeaderImg1 from '../../assets/headerimg1.png'
import HeaderImg2 from '../../assets/headerimg2.webp'
import { Link } from "react-router"

export default function Header() {
  return (
    <div className="py-4 xs:px-6 md:px-16 bg-gradient-to-b from-white via-violet-200 to-white">
        <p className="md:text-5xl xs:text-3xl text-wrap items-center font-yatraone text-center pt-16">
            <span>Challenge,</span> 
            <span className="text-violet-500">Compete</span>
            <span>, Conquer -</span>
        </p>
        <p className="font-cabinsketch py-3 xs:text-lg md:text-3xl flex flex-row gap-1 xs:text-center xs:justify-center md:pl-[35rem] items-center"> 
            <span>Play Chess with </span>
            <span className="text-violet-500 font-bold"> Friends !</span>
            <span className='md:visible md:block xs:hidden xs:invisible'><FaChessRook className="size-4" /></span>
        </p>
        <div className="xs:flex xs:flex-col xs:items-center xs:gap-8 md:grid md:grid-cols-3 md:items-start  md:justify-center py-16 md:gap-2 xs:px-6 md:px-24">
            <div className="col-start-1 col-end-2">
                <div className="flex flex-col gap-4">
                    <p className="font-manrope leading-7">
                        <span className="font-bold">xMate: </span> <br />
                        <span className="text-xs">The Ultimate Online Chess Challenge Platform, </span>
                        <span className="text-xs"> Challenge Your Peers, Master the Board – </span>
                        <span className="font-yatraone ">xMate Awaits!</span>
                    </p>
                    <button className='px-8 text-sm py-1 bg-violet-600  w-fit text-white rounded shadow-violet-200 shadow-md hover:bg-violet-500'>
                        <Link to={'/dashboard'} >Create Your First Match</Link>
                    </button>
                </div>
            </div>
            <div className="md:col-start-2 md:col-end-3 md:pl-10">
                <p className="text-xs font-bold font-manrope py-1">Climb the Ranks.</p>
                <img src={HeaderImg1} alt='headerImage' className="object-cover min-w-28 max-w-60 min-h-44 max-h-52 brightness-75 rounded shadow-lg shadow-violet-100" />
            </div>
            <div className="md:col-start-3 md:col-end-4">
                <p className="text-xs font-bold font-manrope py-1"> – Who’s the Ultimate Chess Champion?</p>
                <img src={HeaderImg2} alt="headerImage2" className="object-fill overflow-hidden 
                md:w-full md:min-w-80 md:max-w-[23rem] md:min-h-72 md:h-auto md:max-h-[20rem]
                brightness-80 rounded shadow-lg shadow-violet-100" />
            </div>
        </div>
    </div>
  )
}