import { useEffect, useState } from 'react';
import { UserDataType,GameMatchtype } from '../../types/types'

type props = {
    gameid:string | undefined;
    userData:UserDataType | undefined;
    gamematchdata:GameMatchtype | undefined;
    socket:WebSocket | undefined;
    playerTurn:string;
    moveMadeFromtoTheDestination:string;
    warning_msgtoshow:string;
    playerStatus : {
      player1 : string;
      player2 : string;
    }
}

// player_1->p1->White
// player_2->p2->Black

function Challengeotherpart({playerTurn,warning_msgtoshow,moveMadeFromtoTheDestination,playerStatus,userData,gamematchdata}:props) { 
  const [gameMatchMoves,setGameMatchMoves] = useState<string[]>(gamematchdata?.moves || [])
  
  useEffect(() => {
    if(moveMadeFromtoTheDestination.trim()){
      // add this new coming move to the game match moves with the previous messages .
      
      const arrLength = gameMatchMoves.length
      if(gameMatchMoves[arrLength-1] != moveMadeFromtoTheDestination.trim()){
        setGameMatchMoves((prevdata) => [...prevdata,moveMadeFromtoTheDestination])
      }
      
    }
  },[moveMadeFromtoTheDestination])

  return (
    <div className='pt-5'>
      <p className='text-center text-sm text-white font-manrope'>The Game Data will show <span className='text-violet-500'>here.</span></p>
      <div className='grid grid-cols-8 pt-5'>
        <div className='col-start-1 col-end-5'>
          <div className='grid grid-cols-4'>

            <div className='col-start-1 col-end-3 font-manrope'>
              <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">player turn.</p>
              <div className="flex flex-col text-white gap-[1px] text-xs">
                <p className="flex flex-row bg-zinc-700 py-1 items-center justify-center gap-4">
                  <span className="bg-white size-2 rounded-full"></span>
                  <span>player_1 {gamematchdata?.player_1 == userData?.id ? userData?.username : ''} </span>
                </p>
                <p className="flex flex-row bg-zinc-700 py-1 items-center justify-center gap-4">
                  <span className="bg-black size-2 rounded-full"></span>
                  <span>player_2 {gamematchdata?.player_2 == userData?.id ? userData?.username : ''}</span>
                </p>

                <p className={`flex flex-row py-1 items-center justify-center 
                  ${playerTurn.trim() === 'White' ? 'bg-zinc-700' : 'bg-white text-zinc-700'}
                 gap-4`}
                >
                  Turn -  {playerTurn} Ki Bajji Hai
                </p>

              </div>
            </div>

            <div className='col-start-3 col-end-5 ml-[2px]'>
              <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">player status</p>
              <div className="flex flex-col gap-[1px] text-white">
                <p className={`text-center text-xs py-1 bg-zinc-600 `}>
                  p1 - 
                  <span className={` ${playerStatus.player1 == 'online' ? 'bg-emerald-400': 'bg-red-400'} ml-1 text-[9px] px-2 py-[2px] rounded-3xl`}>
                    {playerStatus.player1}
                  </span>
                </p>
                <p className="text-center text-xs py-1 bg-zinc-600">p2 -
                  <span className={` ${playerStatus.player2 == 'online' ? 'bg-emerald-400': 'bg-red-400'} ml-1 text-[9px] px-2 py-[2px] rounded-3xl`}>
                    {playerStatus.player2}
                  </span>
                </p>
              </div>
            </div>

          </div>

          <div className={`flex flex-col bg-zinc-700 min-h-40 py-2 items-center justify-center mt-[2px]`}>
            <p className='text-center text-xs text-white'>Message part: </p>
            <p className='text-center text-sm text-emerald-400'>{warning_msgtoshow}</p>
          </div>
        </div>

        <div className='col-start-5 col-end-9 ml-[2px]'>
          <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">All moves</p>
            {
              Array.isArray(gameMatchMoves) && gameMatchMoves.length > 0 ?
              <div className="flex flex-col text-white overflow-y-hidden scrollbar-hide max-h-[calc(97vh-5rem)]">
                {
                  gameMatchMoves.map((data,idx) => (
                    <p key={idx}>
                      {
                        idx % 2 == 0 ? 
                        <span className="text-center text-white inline-block w-full text-xs py-1 bg-zinc-600">p1 - {data}</span>
                        :
                        <span className="text-center text-white inline-block w-full text-xs py-1 bg-zinc-700">p2 - {data}</span>
                      }
                    </p>
                  ))
                }
              </div>
              :
              <p className="text-center text-xs text-white  py-1 bg-zinc-700">moves array is empty</p>
            }
        </div>
      </div>
    </div>
  )
}

export default Challengeotherpart
