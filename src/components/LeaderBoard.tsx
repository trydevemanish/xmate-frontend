import { HiOutlineEmojiSad } from 'react-icons/hi'
import Icon from '../assets/chessicon.png'

const LeaderBoardOption = [
    {
        id:1,
       text : 'S no' 
    },
    {
        id:2,
       text : 'Name' 
    },
    {
        id:3,
       text : 'Game played' 
    },
    {
        id:4,
       text : 'Rank' 
    },
    {
        id:5,
       text : 'Total points' 
    }
]

type LeaderBoardType = {
    id:number,
    text:string
}

export default function LeaderBoard() {
  return (
    <div>
        <div>
            <div className='flex justify-center pt-6 items-center gap-2'>
                <img src={Icon} alt="Icon" className='size-7 shadow-md shadow-violet-1 00' />
                <p className='text-lg font-bold font-manrope'>xMate <span className='text-violet-500 '>Leaderboard</span></p>
            </div>
            <p className='text-xs text-center pl-20 text-violet-500 underline underline-offset-4 font-semibold decoration-violet-600'>- rule the battleground.</p>
        </div>

        <div className='px-4 pt-10'>
            <div className='grid grid-cols-5 gap-[1px]'>
                {LeaderBoardOption.map((data:LeaderBoardType) => (
                    <p key={data?.id} className='text-center text-white py-1 font-manrope font-semibold text-xs bg-violet-500'>{data?.text}</p>
                ))}
            </div>

            <div>
                <div className='flex gap-1 justify-center items-center min-h-[calc(95vh-8rem)]'>
                    <HiOutlineEmojiSad className='size-5' />
                    <p className='text-center'>no data available!</p>
                </div>
            </div>
        </div>
    </div>
  )
}
