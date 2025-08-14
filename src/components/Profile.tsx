import { CgMail } from 'react-icons/cg'
import profileheader from '../assets/profileheader.avif'
import profile from '../assets/scroll3.jpg'
import FaqCard from './FaqCard'
import { HiOutlineEmojiSad } from 'react-icons/hi'
import { UserDataType,GameMatchtype } from '../types/types'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/useContext'
import { FcPrevious } from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { TbCancel } from 'react-icons/tb'
import { FiLoader } from 'react-icons/fi'


const userfieldOptions = [
  {
     id:1,
     text : 'S No.' 
  },
  {
      id:2,
     text : 'game_status' 
  },
  {
      id:3,
     text : 'player_2_status' 
  },
  {
      id:4,
     text : 'game_draw' 
  },
  {
      id:5,
     text : 'game_winner' 
  },
  {
      id:5,
     text : 'View' 
  }
]

type userfieldOptionsType = {
  id:number,
  text:string
}

type RecentgameData = {
  id:number,
  game_id:string;
  created_at:string;
  game_draw:string;
  game_status:string;
  player_2_status:string;
  winner:string;
}

export default function Profile() {
  const [userData,setUserData] = useState<UserDataType>()
  const [loading,setloading] = useState(false)
  const [recentGameOftheUser,setRecentGameOftheUser] = useState<RecentgameData[]>()
  const [fetchGameDatatoShowGameField,setfetchGameDatatoShowGameField] = useState<GameMatchtype>()
  const [gameDataLoading,setGameDataLoading] = useState(false)
  const [whentoShowGameData,SetWhenToShowGameData] = useState(false)

  const { token } = useAuth()
  const navigate = useNavigate()
  if(!token || token == null){
    console.log('Invlaid token')
  }
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL

  // logged in user detail 
  useEffect(() => {
    async function getLoggedInUserDetail() {
      try {
        setloading(true)
        const res = await fetch(`${ApiUrl}/u/user/info/`,{
          method : 'GET',
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
    
        if(!res.ok){
          const errText = await res.json()
          console.error(errText?.message)
          if(errText?.message == 'UnAuthorised user'){
            navigate('/login')
          }
          return;
        }
    
        const data = await res.json()
        console.log(data)
        setUserData(data?.data)
      } catch (error) {
        console.error(`Issue Occured getting user data: ${error}`)
        throw new Error(`Issue Occured getting user data: ${error}`)
      } finally {
        setloading(false)
      }
    }
    getLoggedInUserDetail()
  },[])

  useEffect(() => {
    const fetchRecent_two_game = async() => {
      try {

        const res = await fetch(`${ApiUrl}/g/recent_game/`,{
          method : 'GET',
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })

        if(!res.ok){
          const errText = await res.json()
          console.error(errText?.message)
          return;
        }

        const data = await res.json()
        if(!data){
          console.error('Issue Occured while converting into json response')
          return;
        }

        console.log('recent game data',data)
        setRecentGameOftheUser(data?.data)
      
    } catch (error) {
      console.error(`Issue Occured getting user data: ${error}`)
      throw new Error(`Issue Occured getting user data: ${error}`)
    }
  }
  fetchRecent_two_game()
  },[token])

  const userStatsCardData= [ 
    {
      label1:'No of Games played',
      label2: userData?.total_game_played ? userData.total_game_played.toString() : '0'
    },
    {
      label1:'No of Games win',
      label2:userData?.total_game_win ? userData.total_game_win.toString() : '0'
    },
    {
      label1:'No of Games lossed',
      label2:userData?.total_game_losses ? userData.total_game_losses.toString() : '0'
    },
    {
      label1:'No of Games draw',
      label2:userData?.total_game_draw ? userData.total_game_draw.toString() : '0'
    }
  ]

  const fetchGamedata = async(gameid:string) => {
    try {
      SetWhenToShowGameData(true)
      setGameDataLoading(true)

      const res = await fetch(`${ApiUrl}/g/game_instance/`,{
        method : 'POST',
        headers :{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({game_id:gameid})
      })

      if(!res.ok){
        const errText = await res.json()
        console.error(errText?.message)
        return
      }

      const data = await res.json()

      if(!data){
        console.error('Issue Occured while converting it into Json.')
        return;
      }

      setfetchGameDatatoShowGameField(data?.data)
    } catch (error) {
      console.error(`Issue Occured while fetching game data: ${error}`)
    } finally {
      setGameDataLoading(false)
    }
  }

  return (
    <div className={`px-52 min-h-screen bg-gradient-to-b ${whentoShowGameData ? 'brightness-75 ' : ''} from-white via-violet-200 to-white`}>
      <img src={profileheader} alt="profile image" className='w-full relative object-cover max-h-40 ' />
      <p className='absolute top-3 text-xs cursor-pointer font-manrope rounded-md font-semibold flex flex-row gap-2 items-center px-4 py-1 bg-violet-300 left-60' onClick={() => navigate('/dashboard')}>
        <span><FcPrevious className='size-3' /></span>
        <span>back</span>
      </p>
      <div>  
        {
          userData != undefined ?
          <p className='size-24 object-cover absolute top-28 rounded-full shadow bg-zinc-700 pt-6 font-manrope text-white text-4xl  text-center shadow-violet-200 border left-[220px]'>{userData.username.toString().substring(0,1).toUpperCase()}</p>
          : 
          <img src={profile} alt="profile" className='size-24 object-cover absolute top-28 rounded-full shadow shadow-violet-200 border left-[220px]'/>
        }
      </div>
      {
        loading ? 
        <div className='flex flex-col items-center justify-center min-h-96'>
          <p className='text-center animate-pulse opacity-50'>Wait Fetching User data...</p>
        </div>
        :
        (
          userData != undefined ?
          (
            <div>
              <div className='pt-[53px] grid grid-cols-2'>
                <div className='col-start-1 py-3 px-6 col-end-2 flex flex-col gap-2 text-sm font-manrope font-semibold'>
                  <p>Name: {userData.username}</p>
                  <p className='text-xs opacity-55 flex gap-1 items-center'>
                    <span><CgMail className='size-3' /></span>
                    <span>{userData?.email}</span>
                  </p>
                  <p className='opacity-50 text-xs flex gap-1 items-center'>
                    {/* <span><BsTwitterX className='size-3' /></span> */}
                    <span>Rank : 0</span>
                  </p>
                  <p className='opacity-50 text-xs flex gap-1 items-center'>
                    <span>Total point : {userData?.total_points}</span>
                  </p>
                </div>
                <div className='col-start-2 col-end-3'>
                  <div className="flex flex-col gap-2 items-center place-content-center text-xs">
                    {userStatsCardData.map((data,idx:number) => (
                      <FaqCard label1={data?.label1} label2={data?.label2} key={idx} classNamelabel1='bg-violet-300 font-manrope px-3 py-1 text-xs' classNamelabel2='bg-gray-200 px-3' />
                    ))}
                  </div>
                </div>
              </div>

              <div className='pt-8'>
                <p className='text-xs pb-1 font-manrope font-semibold'>Last 2 matches result :</p>
                <div className='grid grid-cols-6 gap-[1px]'>
                    {userfieldOptions.map((data:userfieldOptionsType) => (
                        <p key={data?.id} className='text-center text-white py-1 font-manrope font-semibold text-xs bg-violet-500'>{data?.text}</p>
                    ))}
                </div>
                {
                  recentGameOftheUser != undefined && recentGameOftheUser.length > 0 ?
                    recentGameOftheUser.map((data:RecentgameData,idx) => (
                        <div className='grid grid-cols-6 items-center gap-[1px] py-1' key={idx}>
                          <p className='text-center text-zinc-700 py-1 font-manrope font-semibold text-xs'>{idx}</p>
                          <p className={`text-center text-zinc-700 py-1 font-manrope text-xs `}>
                            <span className={`${data?.game_status == 'pending' || data?.game_status == 'in_proggess' ? 'bg-zinc-700 inline-block px-6 text-white py-2 rounded-3xl text-[10px]' : 'bg-emerald-400 inline-block px-6 text-white rounded-3xl text-[10px]' }`}>
                              {data?.game_status}
                            </span>
                          </p>
                          <p className='text-center text-zinc-700 py-1 font-manrope font-semibold text-[11px]'>{data?.player_2_status}</p>
                          <p className='text-center text-zinc-700 py-1 font-manrope font-semibold text-xs'>{data?.game_draw ? data?.game_draw : '-'}</p>
                          <p className='text-center text-zinc-700 py-1 font-manrope font-semibold text-xs'>
                            {
                              data?.winner ?
                              data.winner == userData.id.toString() ? `${data.winner} - aka (you)` : `${data.winner}-${userData.username}`  
                              : 'null'
                            }
                          </p>
                          <p className='text-center text-zinc-700 py-1 font-manrope font-semibold text-xs cursor-pointer'>
                            {/* <span className={`${data?.game_status == 'completed' ? '' : 'bg-zinc-600 py-1 inline-block px-6 font-manrope text-zinc-800 rounded-3xl text-[11px]' } text-emerald-500`} 
                            > */}
                            <span className='bg-zinc-600 py-[3px] inline-block px-3 font-manrope text-emerald-300 rounded-sm text-[11px]' onClick={() => fetchGamedata(data?.game_id)}>
                              {
                                data?.game_status == 'completed' ? 'view' : 'view'
                              }
                            </span>
                          </p>
                        </div>
                    ))
                  :
                  <div className='flex gap-1 justify-center items-center pt-3'>
                      <HiOutlineEmojiSad className='size-5' />
                      <p className='text-center'>No game played yet...</p>
                  </div>
                }
              </div>
            </div>
          )
          :
          (
            <div className='flex flex-col gap-3 items-center justify-center min-h-96'>
              <p className='text-center bg-zinc-600 text-white text-xs px-6 py-1 rounded-sm'>No user profile found.</p>
              <button className='text-center bg-zinc-600 font-manrope text-white hover:bg-zinc-400 text-xs px-6 py-1 rounded-sm' onClick={() => navigate('/login')}>Go to login</button>
            </div>
          )
        )
      }

      {
        whentoShowGameData && 
        <div className='absolute top-0 flex flex-col items-center min-h-screen justify-center left-[29rem]'>
          <div className='bg-zinc-700 text-white text-xs py-4 px-6 w-80 h-80 rounded-md font-manrope'>
            <div className='flex flex-col gap-6'>
              <div className='flex flex-row items-center justify-between w-auto'>
                <p></p>
                <p className='text-center'>Game stats:</p>
                <TbCancel className='size-7 px-2 py-1 cursor-pointer rounded-md hover:bg-emerald-400 ' onClick={() => SetWhenToShowGameData(false)} />
              </div>
                {
                  gameDataLoading ?
                  <div className='flex flex-col items-center justify-center min-h-40 '>
                    <FiLoader className='size-4 animate-spin' />
                  </div>
                  :
                  (
                    fetchGameDatatoShowGameField != undefined ?
                    <div className='flex flex-col gap-3 px-2'>
                      <p className='text-wrap'>game id :
                        <span className='text-emerald-300 text-wrap'>{fetchGameDatatoShowGameField?.game_id}</span>
                      </p>
                      <p className='text-wrap'>player_1 :
                        <span className='text-emerald-300 text-wrap'>{fetchGameDatatoShowGameField?.player_1 == userData?.id ? userData?.username : fetchGameDatatoShowGameField.player_1}</span>
                      </p>
                      <p className='text-wrap'>player_2 :
                        <span className='text-emerald-300 text-wrap'>{fetchGameDatatoShowGameField?.player_2 == userData?.id ? userData?.username : fetchGameDatatoShowGameField.player_2}</span>
                      </p>
                      <p className='text-wrap'>Winner :
                        <span className='text-emerald-300 text-wrap'>{fetchGameDatatoShowGameField?.winner == userData?.id ? userData?.username : fetchGameDatatoShowGameField.winner}</span>
                      </p>
                      <p className='text-wrap'>Moves[] :
                        {
                          fetchGameDatatoShowGameField?.moves.map((data:string,idx:number) => (
                            <span className='text-emerald-300 text-wrap' key={idx}>{data}</span>
                          ))
                        }
                      </p>
                  </div>
                    :
                    <div className='flex flex-col items-center justify-center min-h-40 '>
                      <p>Game Field is Undefined!</p>
                    </div>
                  )
                }
            </div>
          </div> 
        </div>
      }
    </div>
  )
}
