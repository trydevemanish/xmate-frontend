import { Chessboard } from "react-chessboard";
import { useEffect, useState } from "react";
import { Chess, Move } from 'chess.js';
import { CustomSquareStyles, Square } from 'react-chessboard/dist/chessboard/types';
import { toast } from "react-toastify";
import Challengeotherpart from "../components/Challengeotherpart";
import { useAuth } from "../context/useContext";
import { useNavigate } from "react-router";
import { useDataStore } from "../zustand/usedatastore";

type SquareStyles = {
  [key in Square]?: React.CSSProperties;
};

export default function Challenge() {
  const [game, setGame] = useState(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | "">("");
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState({} as CustomSquareStyles);
  const [moveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [gameHas2ndPlayerOrNot,setGameHas2ndPlayerOrNot] = useState(false)
  const [show_player_2_howto_join_game_msg,setShow_player_2_howto_join_game_msg] = useState(false)
  const userData = useDataStore(state => state.userData)
  const gameMatchData = useDataStore(state => state.gameData)
  
  const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL
  if(!ApiUrl || ApiUrl==null) console.log('Env variable not loaded')
  const { token } = useAuth()
  const navigate = useNavigate()

  async function Add_Player_2_In_a_game(){
    try {
      const res = await fetch(`${ApiUrl}/g/add_player_2/`,{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
          'Authorizatoin': `Bearer ${token}`
        }
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

  // check if game has 2nd player or not 
  useEffect(() => {
    async function checkIfGameHas2ndPlayer() {
      try {
        const res = await fetch(`${ApiUrl}/g/checkif_gamehas_player_2`,{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({game_id:'dasd'})
        })
  
        if(!res.ok){
          console.error(await res.text())
          return
        }
  
        const data = await res.json()
        console.log(data?.message)
        if(data?.message == 'player_2_has_joined'){
          setGameHas2ndPlayerOrNot(true)
        } else {
          await Add_Player_2_In_a_game()
        }
      } catch (error) {
        console.error(`Issue Occured while checking if user has joined: ${error}`)
      }
    }

    // checkIfGameHas2ndPlayer()
  },[gameHas2ndPlayerOrNot])


  // if not mean 2nd player hasnot joined yet -> then whenevr a new memeber clicked on it then this will work 
  if(gameHas2ndPlayerOrNot == false){

  }

  function getMoveOptions(square : Square) {
    const moves = game.moves({
      square,
      verbose: true
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    if(game.isStalemate()){
      toast.info('Choose diffrenet move.')
    }

    if(game.isGameOver()){
      toast.info('Game over')
    }

    if(game.isDraw()){
      toast.info('Game draw')
    }

    if(game.inCheck()){
      toast.info('In check')
    }

    if(game.isCheckmate()){
      toast.info('Checkmate')
      return;
    }

    const newSquares : SquareStyles = {};

    moves.map((move:Move) => {

      const pieceAtTo = game.get(move.to);
      const pieceAtFrom = game.get(square);

      newSquares[move.to] = {
        background: pieceAtTo && pieceAtFrom && pieceAtTo.color !== pieceAtFrom.color ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%"
      }

      return move;
    })

    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)"
    };

    setOptionSquares(newSquares);
    return true;
    
  }

  function onSquareClick(square:Square) {
    setRightClickedSquares({});

    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    if (!moveTo) {
      const moves = game.moves({
        square:moveFrom as Square,
        verbose: true
      });

      const foundMove = moves.find((m:any) => m.from === moveFrom && m.to === square);

      if (!foundMove) {
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : "");
        return;
      }

      setMoveTo(square);

      if (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8" || foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1") {
        setShowPromotionDialog(true);
        return;
      }

      const gameCopy = new Chess(game.fen());


      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: "q"
      });

      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      setGame(gameCopy);
      setMoveFrom("");
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }

  function onPromotionPieceSelect(piece:any) {
      if (piece) {
        const gameCopy : any = {
          ...game
        };

        gameCopy.move({
          from: moveFrom,
          to: moveTo,
          promotion: piece[1].toLowerCase() ?? "q"
        });

        setGame(gameCopy);
      }
      setMoveFrom("");
      setMoveTo(null);
      setShowPromotionDialog(false);
      setOptionSquares({});

      return true;
  }

  function onSquareRightClick(square : Square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]: rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour ? undefined : {
        backgroundColor: colour
      }
    })
  }

  return (
      <div className="grid grid-cols-2 min-h-screen bg-zinc-800 relative">
        <div className={`col-start-1 col-end-2 ${show_player_2_howto_join_game_msg ? 'opacity-40' : ''}`}>
          <div className="z-50 flex items-center min-h-screen px-6">
              <Chessboard 
                id="ClickToMove" 
                animationDuration={200} 
                arePiecesDraggable={false} 
                position={game.fen()} 
                onSquareClick={onSquareClick} 
                onSquareRightClick={onSquareRightClick} 
                onPromotionPieceSelect={onPromotionPieceSelect} 
                boardWidth={500}
                customBoardStyle={{
                  borderRadius: "2px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
                }} 
                customSquareStyles={{
                  ...moveSquares,
                  ...optionSquares,
                  ...rightClickedSquares
                }} 
                promotionToSquare={moveTo} 
                showPromotionDialog={showPromotionDialog}
              />
          </div>
        </div>
        <div className={`col-start-2 col-end-3 ${show_player_2_howto_join_game_msg ? 'opacity-40' : ''}`}>
          <Challengeotherpart />
        </div>
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

// things solved 
// only player 2 will see the joining message  




// => things to achieve x
//  first check if both player are online -> it mean to check if both pplayer are on the same page or not 
//  2nd check if 2nd player has join the game or not 
//  show thw online players who is online
// only show the helper page to join match to the player 2 if he is not logged in 
