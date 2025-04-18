import { useState } from "react"
import { BiLoader } from "react-icons/bi"
import { BiShareAlt } from "react-icons/bi"
import { BiCopyAlt } from "react-icons/bi"

export default function Creategame() {
  const [loadingState,setLoadingState] = useState(false)
  const [gameCreated,setGameCreated] = useState(false)

  async function handleCreateMatch() {
    try {
      setLoadingState(true)

      console.log('ok')
      
      setGameCreated(true)
    } catch (error) {
      console.log(`Error Occured while creating Game: ${error}`)
    } finally {
      setLoadingState(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center min-h-screen">
      <p className="text-base">
        <span className="opacity-70">Challenge your </span>
        <span className="font-bold font-yatraone">peers</span>
        <span > -rule the battleground.</span>
      </p>
      <p className="bg-violet-500 px-10 py-2 text-xs rounded shadow-lg shadow-violet-200 text-white font-semibold font-manrope cursor-pointer" onClick={handleCreateMatch}>
        {loadingState ? <span><BiLoader className="size-4 animate-spin stroke-white stroke-2" /> Create a game match!</span> : <span>Create a game match!</span> }
      </p>
      {gameCreated && 
          <div className="flex flex-col gap-2">
            <div className="pt-6 pb-2">
              <div className="border border-black px-6 py-6 flex flex-col items-start gap-4 justify-center rounded">
                <div className="flex flex-col gap-1">
                  <p className="font-manrope font-bold text-sm flex gap-1 items-center">
                    <span>Share this link with your friend.</span>
                    <span><BiShareAlt className="size-3 text-violet-500" /></span>
                  </p>
                  <p className="text-xs font-semibold opacity-65 flex gap-1 items-center">
                    <span>click on the link to copy</span>
                    <span><BiCopyAlt className="size-3 text-violet-500" /></span>
                  </p>
                </div>
                <p className="border-2 border-violet-400 px-3 py-1 cursor-pointer rounded text-sm font-manrope">
                  <span className="opacity-70" onClick={() => navigator.clipboard.writeText("http://localhost:5173/challenge/asfidfbsdifbs94734853943g34")}>http://localhost:5173/challenge/asfidfbsdifbs94734853943g34</span>
                </p>
                
              </div>
            </div>
            <div className="flex justify-center">
              <p className="outline-violet-400 outline px-4 py-1 text-xs rounded hover:bg-violet-500 hover:text-white font-manrope font-semibold cursor-pointer focus:outline-none shadow shadow-violet-300 inline-block">Move to game.</p>
            </div>
          </div>
      }
    </div>
  )
}
