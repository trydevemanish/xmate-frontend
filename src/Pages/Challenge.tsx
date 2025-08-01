import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/useContext";
import { useNavigate, useParams } from "react-router";
import { GameMatchtype } from '../types/types'
import { UserDataType } from '../types/types'
import ChallengeSpace from "../components/Challenge/ChallengeSpace";
import GameAccessGate from "../components/Challenge/GameAccessGate";

// also check if the game_id is valid or not if not show him another message;

export default function Challenge() {
  const {gameid} = useParams()
  const [userData,setUserData]=useState<UserDataType>()
  const [gamematchdata,setgamematchdata]=useState<GameMatchtype>()
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
  if(!ApiUrl || ApiUrl==null) console.log('Env variable not loaded')
  const { token,isLoggedIn } = useAuth()
  const navigate = useNavigate()

  // if these checks are true then user will be redirected to dashboard 
  const [gamehasAlready_2Player,setGamehasAlready_2Player] = useState(false) // check for game is full if full then show msg game is full
  const [player_2_hasnotJoinedyet,setPlayer_2_hasnotJoinedyet] = useState(false) // check if player 2 has not joined if not joined then show message
  const [checkIfGameIdValid,setCheckIfGameIdValid] = useState(false) // check if game is not valid then show msg
  const [checkifGameisCompleted,setCheckifGameisCompleted] = useState(false) // check if game is completed or not
  const [checkingOtherValidationMessage,setcheckingOtherValidationMessage] = useState(false) //other validation checks
  const [warningMessage,setWarningMessage] = useState('')

  // find the game and user instance data 
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

        if(data?.data?.game_status == 'completed'){
          toast.success('Game is Already Completed will be redirected to dashboard..')
          setCheckifGameisCompleted(true)
          setWarningMessage('Game is already Completed')
          return;
        }

        // console.log('data message',data)
        setgamematchdata(data?.data)
      } catch (error) {
        setCheckIfGameIdValid(true)
        setWarningMessage('Game id is Invalid')
        console.error(`Issue Occured while fetching game data: ${error}`)
      }
    }

    // fetch user data 
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
        setcheckingOtherValidationMessage(false)
      } catch (error) {
        console.error(`Issue Occured while Fetching User Data: ${error}`)
      }
    }

    // only if user is online then call this method
    if(navigator.onLine){
      fetchGamedata()
      fetchLoggedInUserData()
    } else {
      toast.error('User internet connection issue')
      console.log('User internet connection issue')
    }
  },[gameid,ApiUrl])


  // this will handle all the things if new user visit a match
  useEffect(() => {
    if(!userData || !gamematchdata) {
      setcheckingOtherValidationMessage(true)
      setWarningMessage('both user and game match data are undefined, check Console')
      console.log('both user and game match data are undefined, check Console')
      return;
    }

    if(!token || !isLoggedIn){
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
        if(userData?.id != gamematchdata?.player_1){ // this show it is player 2
          if(gamematchdata?.player_2_status == 'Player_2_Joined'){
            if(gamematchdata?.player_2 != userData?.id){
              setGamehasAlready_2Player(true)
              setWarningMessage('Game Has already 2 player, try creating a new Game')
            } else {
              setGamehasAlready_2Player(false)
              setPlayer_2_hasnotJoinedyet(false)
              setCheckIfGameIdValid(false)
              setCheckifGameisCompleted(false)
              setcheckingOtherValidationMessage(false)
              setWarningMessage('')
            }
          } else {
            // here player two has not joined and the new one looking here is going to be added in the game 
            setWarningMessage('Adding Player 2 to the game')
            Add_Player_2_In_a_game()
            setWarningMessage('Added - refresh it')
          }
        } else {
          if(gamematchdata?.player_2_status != 'Player_2_Joined'){
            setPlayer_2_hasnotJoinedyet(true) //this show player 2 hasnot joined yet
            setWarningMessage('Player 2 has not joined yet')
          }
        }
      }
    }

    setcheckingOtherValidationMessage(false)
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
      toast.success('player 2 has joined the game')
      setcheckingOtherValidationMessage(false)
    } catch (error) {
      console.error(`Issue Occured while Adding player 2: ${error}`)
    }
  }

  return (
      <GameAccessGate
        gamehasAlready_2Player={gamehasAlready_2Player}
        player_2_hasnotJoinedyet={player_2_hasnotJoinedyet}
        checkIfGameIdValid={checkIfGameIdValid}
        checkifGameisCompleted={checkifGameisCompleted}
        checkingOtherValidationMessage={checkingOtherValidationMessage}
        warningMessage={warningMessage}
      >
          <ChallengeSpace gameid={gameid} userData={userData} gamematchdata={gamematchdata} />
      </GameAccessGate>
  )
}

// show error when 
// // game has two player but still any one come to this page - done
// // if game has only one player then show error - done
// // game id is invalid then show error -done
// // game is completed then show error -done
// // player are offline then show error

