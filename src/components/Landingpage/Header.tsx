import { FaChessRook } from "react-icons/fa"
import HeaderImg1 from '../../assets/headerimg1.png'
import HeaderImg2 from '../../assets/headerimg2.webp'

export default function Header() {
  return (
    <div className="py-16 px-16 bg-gradient-to-b from-white via-violet-200 to-white">
        <p className="text-5xl font-yatraone text-center">
            Challenge, 
            <span className="text-violet-500">Compete</span>
            , Conquer -
            </p>
        <p className="font-cabinsketch py-3 text-3xl flex gap-1 pl-[35rem] items-center"> 
            <span>Play Chess with </span>
            <span className="text-violet-500 font-bold"> Friends !</span>
            <span><FaChessRook className="size-4" /></span>
        </p>
        <div className="grid grid-cols-3 justify-center py-16 gap-2 px-24">
            <div className="col-start-1 col-end-2">
                <div className="flex flex-col gap-4">
                    <p className="font-manrope leading-7">
                        <span className="font-bold">xMate: </span> <br />
                        <span className="text-xs">The Ultimate Online Chess Challenge Platform, </span>
                        <span className="text-xs"> Challenge Your Peers, Master the Board – </span>
                        <span className="font-yatraone ">xMate Awaits!</span>
                    </p>
                    <button className='px-8 text-sm py-1 bg-violet-600  w-fit text-white rounded shadow-violet-200 shadow-md hover:bg-violet-500'>Create Your First Match</button>
                </div>
            </div>
            <div className="col-start-2 col-end-3 pl-10">
                <p className="text-xs font-bold font-manrope py-1">Climb the Ranks.</p>
                <img src={HeaderImg1} alt='headerImage' className=" min-w-28 max-w-60 min-h-44 max-h-52 brightness-75 rounded shadow-lg shadow-violet-100" />
            </div>
            <div className="col-start-3 col-end-4">
                <p className="text-xs font-bold font-manrope py-1"> – Who’s the Ultimate Chess Champion?</p>
                <img src={HeaderImg2} alt="headerImage2" className="w-full min-w-80 max-w-[30rem] min-h-72 h-auto max-h-[20rem] brightness-125 rounded shadow-lg shadow-violet-100" />
            </div>
        </div>
    </div>
  )
}