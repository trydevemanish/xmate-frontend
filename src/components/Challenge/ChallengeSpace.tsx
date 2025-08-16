import { Chess, Move } from 'chess.js';
import { toast } from "react-toastify";
import { Chessboard } from "react-chessboard";
import { useEffect,useRef,useState } from 'react'
import Challengeotherpart from './Challengeotherpart';
import { UserDataType,GameMatchtype } from '../../types/types'
import { CustomSquareStyles, Square } from 'react-chessboard/dist/chessboard/types';

type props = {
    gameid : string | undefined;
    userData:UserDataType | undefined;
    gamematchdata:GameMatchtype | undefined;
}

type SquareStyles = {
  [key in Square]?: React.CSSProperties;
};

export default function ChallengeSpace({gameid,userData,gamematchdata}:props) {
    const hasConnectedRef = useRef(false);
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
    const ApiUrl = import.meta.env.VITE_BACKEND_REQUEST_URL

    const [moveMadeFromtoTheDestination,setMoveMadeFromtoTheDestination] = useState('')
    const [playerTurn,setPlayerTurn] = useState<'White' | 'Black'>('White')
    const [gameFenStringFromBackend,setGameFenStringFromBackend] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    const [warning_msgtoshow,setwarning_msgtoshow] = useState('No message')
    const [inputValue,setInputValue] = useState('')
    const [lastMessages,setLastMessages] = useState<string[]>()

    const [isGameCheckMate,setIsGameCheckMate] = useState(false)
    const [checkMateMessage,setCheckMateMessage] = useState('')
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);

    useEffect(() => {
        if (gameFenStringFromBackend) {
            const newGame = new Chess(gameFenStringFromBackend);
            setGame(newGame);
        }
    }, [gameFenStringFromBackend]);

    useEffect(() => {

        if(!gameid || !userData || !gamematchdata || hasConnectedRef.current){
            console.log('Both Value are undefined')
            return
        }

        hasConnectedRef.current = true;

        const socketInstance = new WebSocket(`ws://127.0.0.1:8000/ws/game/${gameid}/?user=${userData.username}&user_id=${userData.id}`)

        socketInstance.onopen = () => {
            console.log('Socket Connected')
            toast.success('conn established')
        }

        socketInstance.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === 'update-player-status') {
                setPlayerStatus(data?.player_status)

                
            } else if (data.action === 'make-move'){
                // console.log(`Fen string from backend: ${data.fen} and the turn: ${data.turn}`)
                setGameFenStringFromBackend(data.fen)
                setPlayerTurn(data.turn)
                setMoveMadeFromtoTheDestination(data?.move)

                if(gamematchdata?.player_1 == userData.id){ // on player 1 machine ( white turn )
                    if(data?.turn == 'White'){
                        setIsPlayerTurn(true)
                    } else {
                        setIsPlayerTurn(false)
                    }
                } else { // on player 2 machine ( Black turn )
                    if(data?.turn == 'Black'){
                        setIsPlayerTurn(true)
                    } else {
                        setIsPlayerTurn(false)
                    }
                }

            } else if (data.action === 'game-event'){
                console.log(`message from the backend check for : ${data.event} && message: ${data?.message} in game-event action`)
                if (data.event == 'checkmate'){
                    //game stop and show a message that the player won and made some changes to update the user,leaderboard,game model feilds
                    setIsGameCheckMate(true)
                    setCheckMateMessage(data?.message)
                    setwarning_msgtoshow(data?.message)

                    if(data?.message.includes('White')){
                        // probabaly player 1 aka white win - updating stats based on this
                        if(userData.id === gamematchdata?.player_1){
                            handleFunctionToUpdateGameStatsAfterCheckMate(userData.id)
                        }
                    } else {
                        // probabaly player 2 aka Black win - updating stats based on this
                        if(userData.id === gamematchdata?.player_2){
                            handleFunctionToUpdateGameStatsAfterCheckMate(userData.id)
                        }
                    }
                } else {
                    if(data.event == 'move_not_legal') {
                        setwarning_msgtoshow(data?.message)
                    } else if (data.event == 'check'){
                        setwarning_msgtoshow(data ?.message)
                    } else if (data.event == 'stalemate'){
                        setwarning_msgtoshow(data?.message)
                    }
                }

            } else if (data.action === 'last-message') {
                console.log(`msg: ${data.message}`)
                setLastMessages((prevmessage:any) => [...prevmessage, data.message])
            }
        }

        socketInstance.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socketInstance.onclose = () => {
            console.log('socket disconnected')
            toast.warning('conn disconnected, refersh the page again to connect')
        }

        setSocket(socketInstance)

        return () => {
            if (socketInstance.readyState === WebSocket.OPEN) {
                socketInstance.close();
            }
        }
    },[gameid,userData,gamematchdata])



    // player making move 
    function playerMakingMove(move:string){
        if(socket || typeof userData != undefined || userData){
            // step 1 - > show this move to the people of the group
            if(!move){
                console.log('move not found')
                return;
            }

            setwarning_msgtoshow('No message')

            socket?.send(JSON.stringify({
                action: 'make-move',
                move_passed: move
            }))
        }
    }



    // player passing last message 
    function passingLastMessagetoEachOther(message:string){
        if(socket && message.trim() || typeof userData != undefined || userData){
            // step 1 - > show this move to the people of the group
            socket?.send(JSON.stringify({
                action: 'last-message',
                message: message
            }))
        }
    }


    // updating the game states after checkmate 
    async function handleFunctionToUpdateGameStatsAfterCheckMate(userid:number){
       try {

        const res = await fetch(`${ApiUrl}/g/updatestats_aftercheckmate/`,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ userid:userid,gameid:gameid })
        })
 
        if(!res.ok){
            console.log(await res.text())
            return;
        }
 
        const data = await res.json()
        if(!data){
            console.log('Issue While Converting into json')
            return;
        }
 
        console.log(data?.message)
       } catch (error) {
            console.log(`Failed to Update Game state after winning...: ${error}`)
            return;
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

        if (!isPlayerTurn) {
            console.log("It's not your turn!");
            return;
        }

        setRightClickedSquares({});

        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            console.log('hasMoveOptions',hasMoveOptions)
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

            console.log('calling the function after making the move to send it to websocket')
            playerMakingMove(`${move.from}${move.to}`)

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
    <div className={`grid grid-cols-2 min-h-screen bg-zinc-800 relative`}>
        <div className={`col-start-1 ${isGameCheckMate ? 'opacity-50' : '' } col-end-2`}>
            <div className='flex flex-col items-center min-h-screen justify-center'>
                <div className='flex flex-col gap-[3px] items-start'>
                    <p className='px-6 text-white font-manrope text-xs'>player_2 
                        <span className='text-center text-xs'>
                            {gamematchdata?.player_2 == userData?.id && playerTurn == 'Black' ? ' - your turn' : '- opponent turn'}
                        </span>
                    </p>
                    <div className="z-50 flex items-center px-6">
                        <Chessboard 
                            id="ClickToMove" 
                            animationDuration={100} 
                            arePiecesDraggable={false} 
                            position={gameFenStringFromBackend} 
                            onSquareClick={isPlayerTurn ? onSquareClick : () => {}}
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
                    <p className='px-6 text-white font-manrope text-xs'>player_1 
                        <span className='text-xs'>
                            {gamematchdata?.player_1 == userData?.id && playerTurn == 'White' ? ' - your turn' : '-opponent turn'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div className={`col-start-2 ${isGameCheckMate ? 'opacity-50' : '' } col-end-3`}>
            <Challengeotherpart gameid={gameid} moveMadeFromtoTheDestination={moveMadeFromtoTheDestination} userData={userData} gamematchdata={gamematchdata} socket={socket} playerTurn={playerTurn} playerStatus={playerStatus} warning_msgtoshow={warning_msgtoshow} />
        </div>

        {
            isGameCheckMate && 
            <div className='absolute flex flex-col items-center min-h-screen justify-center w-full bg-black/30'>
                <div className='bg-zinc-700 rounded-sm shadow-xl px-8 py-6 font-manrope w-[480px] transform transition-all'>
                    <div className='space-y-4'>
                        <div className='text-center space-y-2'>
                            <h2 className='text-lg font-manrope font-bold text-gray-800'>Game Ended!</h2>
                            <p className='text-xl font-semibold text-emerald-600'>{checkMateMessage != '' ? checkMateMessage : 'Ruko yr dek rha hai' } 🏆</p>
                            <p className='text-white text-xs'>All the states will be updated</p>
                            <div className='bg-emerald-100 text-emerald-800 px-4 py-1  rounded-full text-xs inline-block'>
                                Game Status: Completed
                            </div>
                        </div>
                        
                        <div className='mt-9 pt-6 space-y-2'>
                            <p className='text-white text-xs font-manrope font-medium'>Last Message to each other.</p>
                            <div className='flex gap-2 text-sm'>
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    className='flex-1 px-4 border text-xs border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-500'
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Type your message..."
                                />
                                <button onClick={() => passingLastMessagetoEachOther(inputValue)}  className='px-4 py-[5px] bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'>
                                    Send
                                </button>
                            </div>
                            <div className='bg-gray-50 p-4 rounded-xs max-h-32 overflow-y-auto'>
                                <div className='flex flex-col items-center gap-2'>
                                    {
                                        lastMessages != undefined && lastMessages.map((msg:string, index:number) => (
                                            <p className='text-gray-600 text-sm' key={index}>{msg}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
  )
}
