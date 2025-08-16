import { useEffect, useState } from "react"
import { BiLoader, BiSidebar } from "react-icons/bi"
import { BiShareAlt } from "react-icons/bi"
import { BiCopyAlt } from "react-icons/bi"
import { FaChessBoard } from "react-icons/fa6"
import Chessdesign1 from '../assets/chessdesign1.png'
import Chessdesign2 from '../assets/chessdesign2.png'
import { useAuth } from "../context/useContext"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { FiLoader } from "react-icons/fi"
// import { useDataStore } from '../zustand/usedatastore'

const chessDesign = [
  {
    id :1,
    alt:'design1',
    chessdesign : Chessdesign1
  },
  {
    id:2,
    alt:'design2',
    chessdesign : Chessdesign2
  },
]

type props = {
  setShowSidebar : React.Dispatch<React.SetStateAction<boolean>>
}

export default function Creategame({setShowSidebar}:props) {
  const [loadingState,setLoadingState] = useState(false)
  const [gameCreated,setGameCreated] = useState(false)
  const [fethchingPendingGameState,setFethchingPendingGameState] = useState(false)
  const [clickedImageId, setClickedImageId] = useState(0);
  const [show_user_that_he_already_in_game,setShow_user_that_he_already_in_game] = useState(false)
  const [pending_game_id,set_pending_game_id] = useState('')
  const [deleteing_pending_game,setDeleting_Pending_game] = useState(false)
  const [game_id,setgame_id] = useState('')
  const { token } = useAuth()
  if(!token || token==null) console.log('Token is not present')
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
  if(!ApiUrl || ApiUrl==null) console.log('Env variable not loaded')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPendingGame = async() => {
      try {
        setFethchingPendingGameState(true)

        const res = await fetch(`${ApiUrl}/g/pending_game/`,{
          method : "GET",
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

        if (!data){
          console.log('Issue Occured while converting to json')
          return;
        }

        if(data?.message != 'No game is pending'){
          set_pending_game_id(data?.data?.game_id)
          setShow_user_that_he_already_in_game(true)
        }

      } catch (error) {
        console.error(`Issue Occured while fetching Pending game : ${error}`)
      } finally {
        setFethchingPendingGameState(false)
      }
    }
    fetchPendingGame()
  },[token])

  async function handleCreateMatch() {
    try {

      setLoadingState(true)

      if(show_user_that_he_already_in_game){
        toast.success('still a match is pending check console..')
        console.log('One game is still in pending state complete or delete it to start a new match')
        return;
      }

      const res = await fetch(`${ApiUrl}/g/creatematch/`,{
        method : 'POST',
        headers : {
          'Authorization' : `Bearer ${token}`
        }
      })

      if(!res.ok){
        const errText = await res.json()
        console.error(errText?.message)
        return;
      }
      
      const CreatedMatchData = await res.json()
      console.log(CreatedMatchData?.message)

      if(CreatedMatchData?.message == 'you are already in a game'){
        setShow_user_that_he_already_in_game(true)
        return ;
      }

      // setting the game data here 
      setgame_id(CreatedMatchData?.data?.game_id)
      // useDataStore.getState().setGameData(CreatedMatchData?.data) // setting the newly created game data here 
      toast.success('A new match has created')
      setGameCreated(true)
    } catch (error) {
      console.error(`Error Occured while creating Game: ${error}`)
      throw new Error(`Error Occured while creating Game: ${error}`)
    } finally {
      setLoadingState(false)
    }
  }

  async function deletePendingGame(game_id:string){
    try {
      setDeleting_Pending_game(true)

      const res = await fetch(`${ApiUrl}/g/delete_game/`,{
        method : 'DELETE',
        headers : {
          'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({ game_id:game_id})
      })

      if(!res.ok){
        const errText = await res.json()
        console.error(errText?.message)
        return;
      }

      const data = await res.json()
      console.log(data?.message)
      setShow_user_that_he_already_in_game(false)
    } catch (error) {
      console.error(`Error Occured while creating Game: ${error}`)
      throw new Error(`Error Occured while creating Game: ${error}`) 
    } finally {
      setDeleting_Pending_game(false)
    }
  }

  return (
    <div className="max-h-screen overflow-hidden">
      <BiSidebar className='size-7 py-1 xs:visible xs:block md:hidden md:invisible' onClick={() => setShowSidebar(prev => !prev)} />
      <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
        <p className="flex items-center gap-1">
          <span><FaChessBoard className="size-5 text-violet-400" /></span>
          <span>Choose the chessBoard design.</span>
        </p>
        <div className="flex items-center gap-4 py-6">
          {chessDesign.map((data) => (
            <img
              src={data?.chessdesign}
              alt={data?.alt}
              key={data?.id} 
              className={`size-20 shadow shadow-violet-300 cursor-pointer ${clickedImageId === data?.id ? 'border-black border rounded' : ''}`}
              onClick={() => {
                setClickedImageId(data?.id);
              }}
            />
          ))}
        </div>
        <p className="xs:text-base md:xs:text-base md:text-xs">
          <span className="opacity-70">Challenge your </span>
          <span className="font-bold font-yatraone">peers</span>
          <span > -rule the battleground.</span>
        </p>
        <div className="bg-violet-500 px-10 py-2 xs:text-base md:xs:text-base md:text-xs rounded shadow-lg shadow-violet-200 text-white font-semibold font-manrope cursor-pointer" onClick={handleCreateMatch}>
          {
            loadingState ? 
            <p className="flex flex-row items-center justify-center">
              <span><BiLoader className="size-3 animate-spin stroke-white stroke-2" /></span>
              <span>wait creating!</span>
            </p>
            : 
            <span>Create a game match!</span> 
          }
        </div>
        {gameCreated && 
            <div className="flex flex-col gap-2">
              <div className="pt-6 pb-2">
                <div className="border border-black px-6 py-6 flex flex-col items-start gap-4 justify-center rounded-sm">
                  <div className="flex flex-col gap-1">
                    <p className="font-manrope font-bold xs:text-base md:xs:text-base md:text-xs flex gap-1 items-center">
                      <span>Share this link with your friend.</span>
                      <span><BiShareAlt className="size-3 text-violet-500" /></span>
                    </p>
                    <p className="xs:text-base md:text-xs font-semibold opacity-65 flex gap-1 items-center cursor-pointer" onClick={() => navigator.clipboard.writeText(`http://localhost:5173/challenge/u/${game_id}`)}>
                      <span>click here to copy the link.</span>
                      <span><BiCopyAlt className="size-3 text-violet-500" /></span>
                    </p>
                  </div>
                  <p className="border-2 border-violet-400 px-3 py-1 cursor-pointer rounded xs:text-base md:xs:text-base md:text-xs font-manrope">
                    <span className="opacity-70">
                      http://localhost:5173/challenge/u/{game_id}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <p className="outline-violet-400 outline px-4 py-1 xs:text-base md:xs:text-base md:text-xs rounded hover:bg-violet-500 hover:text-white font-manrope font-semibold cursor-pointer focus:outline-none shadow shadow-violet-300 inline-block" onClick={() => navigate(`/challenge/u/${game_id}`)}>Move to game.</p>
              </div>
            </div>
        }

        {
          !fethchingPendingGameState ? 
          show_user_that_he_already_in_game ?
            <div className="flex flex-col items-center pt-2 justify-center gap-3">
              <div className="bg-zinc-600 px-6 py-1 rounded-sm text-white font-manrope xs:text-base md:text-xs">
                <p>You are already in a game, you {"can't"} create a new game.</p>
                <p className="text-center pt-1">complete your pending match, or delete this one .</p>
              </div>
              <div className="flex flex-row items-center gap-3">
                <button className="xs:text-base md:text-xs bg-zinc-500 px-5 py-1 rounded-sm text-white hover:bg-zinc-400" onClick={() => navigate(`/challenge/u/${pending_game_id}`)}>move to pending match</button>
                <button className="xs:text-base md:text-xs bg-red-500  px-5 py-1 hover:bg-red-400 rounded-sm text-white" onClick={() => deletePendingGame(pending_game_id)}>
                  {
                    deleteing_pending_game ? 
                    <span className="animate-pulse opacity-55">wait deleting ...</span>
                    :
                    'delete it'
                  }
                </button>
              </div>
            </div>
            :
            <div className="bg-zinc-600 px-6 py-1 rounded-sm text-white font-manrope xs:text-base md:text-xs">
              <p>No pending game, you can create new game.</p>
            </div>
          :
          <div className=" bg-zinc-700 px-6 py-1 rounded-sm text-white font-manrope xs:text-base md:text-xs">
            <p className="flex flex-row items-center gap-1">
              <span><FiLoader className="size-3 animate-spin stroke-white stroke-2" /></span>
              <span>Wait fetching pending game.</span>
            </p>
          </div>
        }
      </div>
    </div>
  )
}
