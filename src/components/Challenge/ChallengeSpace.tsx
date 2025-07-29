import React from 'react'
import { Chessboard } from "react-chessboard";
import { useState,useEffect } from "react";
import { Chess, Move } from 'chess.js';
import { CustomSquareStyles, Square } from 'react-chessboard/dist/chessboard/types';
import { toast } from "react-toastify";
import Challengeotherpart from './Challengeotherpart';
import { UserDataType,GameMatchtype } from '../../types/types'

type SquareStyles = {
  [key in Square]?: React.CSSProperties;
};

type props = {
    gameid : string | undefined;
    userData:UserDataType | undefined;
    gamematchdata:GameMatchtype | undefined;
}

export default function ChallengeSpace({gameid,userData,gamematchdata}:props) {
    const [game, setGame] = useState(new Chess());
    const [moveFrom, setMoveFrom] = useState<Square | "">("");
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({} as CustomSquareStyles);
    const [moveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    // websocket related states
    const [socket,setSocket] = useState<WebSocket>()
    const [playerStatus, setPlayerStatus] = useState({
        player1: 'offline',
        player2: 'offline',
    });

    const [moveMadeFromtoTheDestination,setMoveMadeFromtoTheDestination] = useState('')
    const [playerTurn,setPlayerTurn] = useState('')
    const [gameFenStringFromBackend,setGameFenStringFromBackend] = useState('')
    


    useEffect(() => {
        if (!gameid || !userData) {
            console.log('Game id and userData is null')
            return ;
        }

        if(typeof userData == undefined || typeof gamematchdata == undefined){
            console.log('User data && gamematchdata is possibly undefined')
            return;
        }

        const socketInstace = new WebSocket(`ws://127.0.0.1:8000/ws/game/${gameid}/?user=${userData.username}`)

        socketInstace.onopen = () => {
            console.log('Socket Connected')

            socketInstace.send(JSON.stringify({
                action: 'online-status',
                online: 'online'
            }))
        }

        socketInstace.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === 'online-status') {
                console.log(`User ${data.user} is ${data.status}`);
                if(gamematchdata?.player_1 == userData.id && data.user == userData.username ){
                    setPlayerStatus((prev) => ({ ...prev, player1: data.status }));
                } else if (gamematchdata?.player_2 == userData.id && data.user == userData.username){
                    setPlayerStatus((prev) => ({ ...prev, player2: data.status }));
                }
            } else if (data.action === 'make-move'){
                console.log(`Fen string from backend: ${data.fen} and the turn: ${data.turn}`)
            } else if (data.action === 'game-event'){
                console.log(`message from the backend check for : ${data.event} && message: ${data?.message}`)
            }
        };


        socketInstace.onclose = () => {
            console.log('socket disconnected')
            // Notify the server that the user is offline
            socketInstace.send(JSON.stringify({
                action: 'online-status',
                online: 'offline',
            }));
        }

        setSocket(socketInstace);

        return () => socketInstace.close()

    },[gameid, userData, gamematchdata])

    function playerMakingMove(move:string){
        if(socket || typeof userData != undefined || userData){
            // step 1 - > show this move to the people of the group
            if(!move){
                console.log('move not found')
                return;
            }

            console.log('move type',typeof move)
            console.log('move',move)

            socket?.send(JSON.stringify({
                action: 'make-move',
                move_passed: move
            }))
        }
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

        // console.log('Move',move.from, move.to)

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

            // console.log('moves checking',`${move.from}${move.to}`)
            console.log('calling the function after making the move')
            playerMakingMove(`${move.from}${move.to}`)
            // playerMakingMove(move)

            setMoveMadeFromtoTheDestination(`${move.from}-${move.to}`)

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
            console.log('GaweCopy',gameCopy)
        }
        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});

        return true;
    }

  return (
    <div className="grid grid-cols-2 min-h-screen bg-zinc-800 relative">
        <div className={`col-start-1 col-end-2`}>
            <div className="z-50 flex items-center min-h-screen px-6">
                <Chessboard 
                    id="ClickToMove" 
                    animationDuration={200} 
                    arePiecesDraggable={false} 
                    position={game.fen()} 
                    onSquareClick={onSquareClick} 
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
        <div className={`col-start-2 col-end-3`}>
            <Challengeotherpart gameid={gameid} userData={userData} gamematchdata={gamematchdata} socket={socket}  playerStatus={playerStatus} />
        </div>
    </div>
  )
}
