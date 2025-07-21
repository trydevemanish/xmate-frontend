import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { BiShareAlt } from "react-icons/bi"
import { BiCopyAlt } from "react-icons/bi"
import { FaChessBoard } from "react-icons/fa6"
import Chessdesign1 from '../assets/chessdesign1.png'
import Chessdesign2 from '../assets/chessdesign2.png'
import { useAuth } from "../context/useContext"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { useDataStore } from '../zustand/usedatastore'

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

export default function Creategame() {
  const [loadingState,setLoadingState] = useState(false)
  const [gameCreated,setGameCreated] = useState(false)
  const [clickedImageId, setClickedImageId] = useState(0);
  const { token } = useAuth()
  if(!token || token==null) console.log('Token is not present')
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
  if(!ApiUrl || ApiUrl==null) console.log('Env variable not loaded')
  const navigate = useNavigate()

  async function handleCreateMatch() {
    try {
      setLoadingState(true)

      const res = await fetch(`${ApiUrl}/g/creatematch/`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })

      if(!res.ok){
        console.error(await res.text())
        return;
      }
      
      const CreatedMatchData = await res.json()
      console.log(CreatedMatchData?.message)
      // setting the game data here 
      useDataStore.getState().setGameData(CreatedMatchData?.data) // setting the newly created game data here 
      toast.success('A new match has created')
      setGameCreated(true)

    } catch (error) {
      console.error(`Error Occured while creating Game: ${error}`)
      throw new Error(`Error Occured while creating Game: ${error}`)
    } finally {
      setLoadingState(false)
    }
  }

  return (
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
      <p className="text-sm">
        <span className="opacity-70">Challenge your </span>
        <span className="font-bold font-yatraone">peers</span>
        <span > -rule the battleground.</span>
      </p>
      <p className="bg-violet-500 px-10 py-2 text-xs rounded shadow-lg shadow-violet-200 text-white font-semibold font-manrope cursor-pointer" onClick={handleCreateMatch}>
        {
          loadingState ? 
          <p className="flex flex-row items-center justify-center">
            <span><BiLoader className="size-4 animate-spin stroke-white stroke-2" /></span>
            <span>wait creating!</span>
          </p>
           : 
          <span>Create a game match!</span> 
        }
      </p>
      {gameCreated && 
          <div className="flex flex-col gap-2">
            <div className="pt-6 pb-2">
              <div className="border border-black px-6 py-6 flex flex-col items-start gap-4 justify-center rounded-sm">
                <div className="flex flex-col gap-1">
                  <p className="font-manrope font-bold text-sm flex gap-1 items-center">
                    <span>Share this link with your friend.</span>
                    <span><BiShareAlt className="size-3 text-violet-500" /></span>
                  </p>
                  <p className="text-xs font-semibold opacity-65 flex gap-1 items-center cursor-pointer" onClick={() => navigator.clipboard.writeText("http://localhost:5173/challenge/u/asfidfbsdifbs94734853943g34")}>
                    <span>click here to copy the link.</span>
                    <span><BiCopyAlt className="size-3 text-violet-500" /></span>
                  </p>
                </div>
                <p className="border-2 border-violet-400 px-3 py-1 cursor-pointer rounded text-sm font-manrope">
                  <span className="opacity-70">
                    http://localhost:5173/challenge/u/asfidfbsdifbs94734853943g34
                  </span>
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="outline-violet-400 outline px-4 py-1 text-xs rounded hover:bg-violet-500 hover:text-white font-manrope font-semibold cursor-pointer focus:outline-none shadow shadow-violet-300 inline-block" onClick={() => navigate('/challenge/u/asfidfbsdifbs94734853943g34')}>Move to game.</p>
            </div>
          </div>
      }
    </div>
  )
}
