import { HiOutlineEmojiSad } from 'react-icons/hi'
import Icon from '../assets/chessicon.png'
import { useEffect, useState } from 'react'
import { LeaderBoardDataType, UserDataType } from '../types/types'
import { BiLoader, BiSidebar } from 'react-icons/bi'

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
       text : 'G. played' 
    },
    {
        id:4,
       text : 'G. Win' 
    },
    {
        id:5,
       text : 'Total pts' 
    },
    {
        id:6,
       text : 'Win %' 
    },
    {
        id:7,
       text : 'leaderborad pts' 
    },
    {
        id:8,
       text : 'last played' 
    },
    {
        id:9,
       text : 'Rank' 
    }
]

type LeaderBoardType = {
    id:number,
    text:string
}

type props = {
  setShowSidebar : React.Dispatch<React.SetStateAction<boolean>>
}



export default function LeaderBoard({setShowSidebar}:props) {
    const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
    const [AllUserRankData,setAllUserRankData] = useState<LeaderBoardDataType[]>([])
    const [loading,setLoading]=useState(false)

    useEffect(() => {
        async function fetchAllUsertoFindRank(){
            try {
                setLoading(true)
                const res = await fetch(`${ApiUrl}/u/check_rank/`)

                if(!res.ok){
                    const errText = await res.json()
                    console.error(errText?.message)
                    return
                }
                
                const data = await res.json()
                console.log('Data',data)

                setAllUserRankData(data?.data)
                
            } catch (error) {
                console.error('Issue Occured while Fetching all Usr detail',error)
            } finally {
                setLoading(false)
            }
        }

        if(navigator.onLine){
            fetchAllUsertoFindRank()
        } else {
            console.log('User is offline')
        }

    },[])

  return (
    <div>
        <BiSidebar className='size-7 py-1 xs:visible xs:block md:hidden md:invisible' onClick={() => setShowSidebar(prev => !prev)} />
        <div>
            <div>
                <div className='flex justify-center pt-6 items-center gap-2'>
                    <img src={Icon} alt="Icon" className='size-7 shadow-md shadow-violet-1 00' />
                    <p className='xs:text-xl md:text-lg font-bold font-manrope'>xMate <span className='text-violet-500 '>Leaderboard</span></p>
                </div>
                <p className='xs:text-base md:text-xs text-center pl-20 text-violet-500 underline underline-offset-4 font-semibold decoration-violet-600'>- rule the battleground.</p>
            </div>

            <div className='px-4 pt-10'>
                <div className='grid grid-cols-9 gap-[1px]'>
                    {LeaderBoardOption.map((data:LeaderBoardType) => (
                        <p key={data?.id} className='text-center text-white py-1 font-manrope font-semibold xs:text-base md:text-xs bg-violet-500'>{data?.text}</p>
                    ))}
                </div>

                <div>
                    {
                        loading ?
                        <div className='flex gap-1 justify-center items-center min-h-[calc(95vh-8rem)]'>
                            <BiLoader className='size-4 animate-spin' />
                        </div>
                        :
                        (
                            Array.isArray(AllUserRankData) && AllUserRankData.length > 0 ?
                                <div className='flex flex-col gap-[1px] pt-[1px]'>
                                    {
                                        AllUserRankData.map((data:LeaderBoardDataType,idx:number) => (
                                            <div className='grid grid-cols-9 gap-px xs:text-base md:text-xs bg-neutral-200' key={idx}>
                                                <p className='col-start-1 col-end-2 text-center  py-1 font-manrope font-semibold'>{idx}</p>
                                                <p className='col-start-2 col-end-3 text-center py-1 font-manrope font-semibold '>{data.username}</p>
                                                <p className='col-start-3 col-end-4 text-center  py-1 font-manrope font-semibold'>{data?.total_game_played}</p>
                                                <p className='col-start-4 col-end-5 text-center py-1 font-manrope font-semibold  '>{data?.total_game_win}</p>
                                                <p className='col-start-5 col-end-6 text-center  py-1 font-manrope font-semibold  '>{data?.total_points}</p>

                                                <p className='col-start-6 col-end-7 text-center  py-1 font-manrope font-semibold text-red-700'>{data?.win_rate}</p>
                                                <p className='col-start-7 col-end-8 text-center  py-1 font-manrope font-semibold  text-green-800'>{data?.leaderboard_score}</p>
                                                <p className='col-start-8 col-end-9 text-center  py-1 font-manrope font-semibold  '>{data?.recent_game_played} days</p>

                                                <p className='col-start-9 col-end-10 text-center  py-1 font-manrope font-semibold '>
                                                    {
                                                        idx == 0 ? 
                                                        '1st'
                                                        :
                                                        (
                                                            idx == 1 ?
                                                            '2nd'
                                                            :
                                                            (
                                                                idx == 2 ?
                                                                '3rd'
                                                                :
                                                                '-'
                                                            )
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            :
                            <div className='flex gap-1 justify-center items-center min-h-[calc(95vh-8rem)]'>
                                <HiOutlineEmojiSad className='size-5' />
                                <p className='xs:text-base md:text-xl text-center'>no data available!</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

