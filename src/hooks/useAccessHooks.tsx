import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { UserDataType,GameMatchtype } from '../types/types'

type props = {
    gameid:string | undefined;
    ApiUrl:string;
    token:string | null;
    isLoggedIn:boolean;
    Add_Player_2_In_a_game: () => void
}

export function useGameAccess({
  gameid,
  ApiUrl,
  token,
  isLoggedIn,
  Add_Player_2_In_a_game
}:props) {
  const [userData, setUserData] = useState<UserDataType>();
  const [gamematchdata, setGameMatchData] = useState<GameMatchtype>();

  const [gamehasAlready_2Player, setGameHasAlready2Player] = useState(false);
  const [player_2_hasnotJoinedyet, setPlayer2HasNotJoinedYet] = useState(false);
  const [checkIfGameIdValid, setCheckIfGameIdValid] = useState(false);
  const [checkifGameisCompleted, setCheckIfGameIsCompleted] = useState(false);
  const [checkingOtherValidationMessage, setCheckingOtherValidationMessage] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const navigate = useNavigate();
  const addPlayer2Called = useRef(false); // ✅ Prevent duplicate calls
  const hasFetchedOnce = useRef(false);

  // Fetch and validate data
  useEffect(() => {
    if (hasFetchedOnce.current) return;
    hasFetchedOnce.current = true;

    if (!navigator.onLine) {
      toast.error('User internet connection issue');
      return;
    }

    const fetchAllData = async () => {
      setCheckingOtherValidationMessage(true);
      setWarningMessage('Wait Fetching Userdata and game data ...');

      try {
        const [gameRes, userRes] = await Promise.all([
          fetch(`${ApiUrl}/g/game_instance/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ game_id: gameid })
          }),
          fetch(`${ApiUrl}/u/user/info/`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!gameRes.ok) {
          const errText = await gameRes.json();
          console.error(errText?.message);
          setCheckIfGameIdValid(true);
          setWarningMessage('Game id is Invalid');
          return;
        }

        if (!userRes.ok) {
          const errText = await userRes.json();
          console.error(errText?.message);
          if (errText?.message === 'UnAuthorised user') {
            navigate('/login');
          }
          return;
        }

        const gameData = await gameRes.json();
        const userData = await userRes.json();

        if (gameData?.data?.game_status === 'completed') {
          toast.success('Game is Already Completed. Redirecting...');
          setCheckIfGameIsCompleted(true);
          setWarningMessage('Game is already Completed');
          return;
        }

        setGameMatchData(gameData?.data);
        setUserData(userData?.data);

        // Validation happens right here
        validateAccess(userData?.data, gameData?.data);
      } catch (error) {
        console.error(`Issue occurred while making request: ${error}`);
      }
    };

    const validateAccess = async (user: UserDataType, game: GameMatchtype) => {
      if (!token) {
        console.log('login value',token,isLoggedIn)
        setWarningMessage('User is not logged in');
        return;
      }

      if (user.id !== game.player_1) {
        // This is Player 2 logic
        if (game.player_2_status === 'Player_2_Joined') {
          if (game.player_2 !== user.id) {
            setGameHasAlready2Player(true);
            setWarningMessage('Game already has 2 players. Try creating a new Game');
          } else {
            resetValidationFlags();
          }
        } else {
          if (!addPlayer2Called.current) {
            setWarningMessage('Adding Player 2 to the game');
            addPlayer2Called.current = true;
            await Add_Player_2_In_a_game();
          }
        }
      } else {
        // Player 1 logic
        if (game.player_2_status !== 'Player_2_Joined') {
          setPlayer2HasNotJoinedYet(true);
          setWarningMessage('Player 2 has not joined yet');
        }
      }

      setCheckingOtherValidationMessage(false);
    };

    const resetValidationFlags = () => {
      setGameHasAlready2Player(false);
      setPlayer2HasNotJoinedYet(false);
      setCheckIfGameIdValid(false);
      setCheckIfGameIsCompleted(false);
      setCheckingOtherValidationMessage(false);
      setWarningMessage('');
    };

    fetchAllData();
    
  }, [gameid, ApiUrl, token]);

  return {
    userData,
    gamematchdata,
    gamehasAlready_2Player,
    player_2_hasnotJoinedyet,
    checkIfGameIdValid,
    checkifGameisCompleted,
    checkingOtherValidationMessage,
    warningMessage
  };
}
