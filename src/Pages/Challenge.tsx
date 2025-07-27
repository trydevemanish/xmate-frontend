import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/useContext";
import { useNavigate, useParams } from "react-router";
import { GameMatchtype } from '../types/types'
import { UserDataType } from '../types/types'
import ChallengeSpace from "../components/Challenge/ChallengeSpace";

// also check if the game_id is valid or not if not show him another message;

export default function Challenge() {
  const {gameid} = useParams()
  const [userData,setUserData]=useState<UserDataType>()
  const [gamematchdata,setgamematchdata]=useState<GameMatchtype>()
  const [gameHas2ndPlayerOrNot,setGameHas2ndPlayerOrNot] = useState(false)
  const [show_player_2_howto_join_game_msg,setShow_player_2_howto_join_game_msg] = useState(false)
  const [showMessageIfGameIDisnotValid,setshowMessageIfGameIDisnotValid] = useState(false)
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
  if(!ApiUrl || ApiUrl==null) console.log('Env variable not loaded')
  const { token,isLoggedIn } = useAuth()
  const navigate = useNavigate()

  // find the game instance data 
  useEffect(() => {
    const fetchGamedata = async() => {
      try {
        const res = await fetch(`${ApiUrl}/g/game_instance/`,{
          method : 'POST',
          headers :{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({game_id:gameid})
        })

        if(!res.ok){
          console.error(await res.text())
          return;
        }

        const data = await res.json()
        if(!data){
          console.error('Issue Occured while converting it into Json.')
          return;
        }

        // console.log('data message',data)

        setgamematchdata(data?.data)
        setShow_player_2_howto_join_game_msg(false)

      } catch (error) {
        setshowMessageIfGameIDisnotValid(true)
        console.error(`Issue Occured while fetching game data: ${error}`)
      }
    }
    // only if user is online then call this method
    if(navigator.onLine){
      fetchGamedata()
    } else {
      toast.error('User is offline')
      console.log('user is offline,cant make req to Db')
    }
  },[gameid,ApiUrl])

  // fetch the user instance data
  useEffect(() => {
    const fetchLoggedInUserData = async() => {
      try {
        const res = await fetch(`${ApiUrl}/u/user/info/`,{
          method : 'GET',
          headers : {
            'Authorization' : `Bearer ${token}`
          }
        })
    
        if(!res.ok){
          console.error(await res.text())
          return;
        }
    
        const data = await res.json()
        if(!data){
          console.error('Issue Occured while converting it into Json.')
          return;
        }
        // console.log(data)
        setUserData(data?.data)
        setShow_player_2_howto_join_game_msg(false)
      } catch (error) {
        console.error(`Issue Occured while Fetching User Data: ${error}`)
      }
    }

    if(navigator.onLine){
      fetchLoggedInUserData()
    } else {
      console.log('user is offline,cant make req to Db')
    }
  },[ApiUrl])


  // this will handle all the things if new user visit a match
  useEffect(() => {
    if(!userData || !gamematchdata) {
      setShow_player_2_howto_join_game_msg(true)
      console.log('both user and game match data are undefined, check Console')
      return;
    }

    if(!token || !isLoggedIn){
      setShow_player_2_howto_join_game_msg(true)
    } else {
      // if user login hai - done 
      // check if that user is player 1 - done
      // if yes then ok dont do anything -done
      // if no: - done
      // then check if game has two player already -- done
      // if game has 2 player already then check if the player id is equal to game player_2 
      //   if yes then dont do anything - done
      //   if no : then show a message that game has alreay both player and automatically naviagte him to /Dashboard
      // if game dont have 2 player then add him to the game 

      if(userData != undefined){
        if(gamematchdata?.player_1 != userData.id){
          if(gamematchdata?.player_2_status == 'Player_2_Joined'){
            if(gamematchdata?.player_2 != userData?.id){
              setGameHas2ndPlayerOrNot(true)
              setTimeout(() => {
                navigate('/dashboard')
              }, 4000);
            } 
          } else {
            // here player two has not joined and the new one looking here is going to be added in the game 
            Add_Player_2_In_a_game()
          }
        }
      }
    }
  },[isLoggedIn,userData,gamematchdata,navigate])

  // Adding player 2 in a match 
  async function Add_Player_2_In_a_game(){
    try {
      const res = await fetch(`${ApiUrl}/g/add_player_2/`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify({game_id:gameid})
      })
  
      if(!res.ok){
        console.error(await res.text())
        return
      }
  
      const data = await res.json()
      console.log(data?.message)
      // stop showing the player 2 to how to join the match 
      setShow_player_2_howto_join_game_msg(false)
      toast.success('player 2 has joined the game')
    } catch (error) {
      console.error(`Issue Occured while Adding player 2: ${error}`)
    }
  }

  return (
      <div>
        {
          showMessageIfGameIDisnotValid ?
            <div className="bg-zinc-800 min-h-screen relative">
              <div className="absolute flex flex-col items-center justify-center min-h-screen w-full">
                <div className="bg-zinc-600 max-w-md w-96 h-52 rounded-sm">
                  <div className="flex flex-col items-center py-3">
                    <div className="flex flex-col items-center justify-center min-h-52 gap-5">
                      <p className="text-white font-manrope text-sm">Game id is Invalid, try creating a new match.</p>
                      <div className="flex flex-col gap-2 item-center">
                        <button className="bg-zinc-700 text-white hover:bg-zinc-500 rounded-sm text-sm px-4 py-1 self-start" onClick={() => navigate('/dashboard')}>Creategame</button>
                        <p className="text-white text-center text-xs font-manrope">Happy match...</p>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          :
          (
            <div>
              <ChallengeSpace gameid={gameid} userData={userData} gamematchdata={gamematchdata} />
                {
                  // show_player_2_howto_join_game_msg && gameMatchData.player_1 != userData.id && 
                  show_player_2_howto_join_game_msg && 
                  <div className="absolute flex flex-col items-center justify-center min-h-screen w-full">
                    <div className="bg-zinc-600 max-w-md w-96 h-72 rounded-sm">
                      <div className="flex flex-col items-center py-3">
                        <div className="flex flex-col items-center justify-between min-h-52 gap-5">
                          <p className="text-white text-sm">You can follow these steps to join this match.</p>
                          {
                            gameHas2ndPlayerOrNot ? 
                            <p>Match is full try joining another game</p>
                            :
                            <>
                              <div className="flex flex-col items-start text-white text-sm gap-2">
                                <p>
                                  <span className="text-red-500 pr-1 font-semibold">1.</span>
                                  <span>First you need to create an account.</span>
                                </p>
                                <p>
                                  <span className="text-red-500 pr-1 font-semibold">2.</span>
                                  <span>Login into your account.</span>
                                </p>
                                <p>
                                  <span className="text-red-500 pr-1 font-semibold">3.</span>
                                  <span>Again click on the game link provided by the friend.</span>
                                </p>
                                <p>
                                  <span className="text-red-500 pr-1 font-semibold">4.</span>
                                  <span>Wait a sec you will automatically be redirected.</span>
                                </p>
                                <div className="flex flex-row self-start items-center justify-center">
                                  <button className="bg-slate-700 rounded px-4 py-2 text-xs hover:bg-slate-600" onClick={() => navigate('/login')}>Login page.</button>
                                </div>
                              </div>
                              <p className="text-white text-sm">Enjoy the match... 😁</p>
                            </>
                          }
                        </div>
                      </div>
                    </div> 
                  </div>
                }
            </div>
          )
        }
      </div>
  )
}





