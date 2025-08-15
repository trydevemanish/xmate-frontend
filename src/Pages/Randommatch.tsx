import { Chess} from 'chess.js';
import { useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';
import { Link } from 'react-router';

export default function Randommatch() {
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;
    const [matchover,setmatchOver] = useState(false)
    const [msg,setMsg] = useState('')

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [moveFrom, setMoveFrom] = useState('');
    const [optionSquares, setOptionSquares] = useState({});

    function makeRandomMove() {
      const possibleMoves = chessGame.moves();

      if (chessGame.isCheckmate()) {
        setmatchOver(true);
        setMsg('user win')
        return;
      }
      
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      chessGame.move(randomMove);
      setChessPosition(chessGame.fen());
    }

    function getMoveOptions(square: Square) {

      if(chessGame.isCheckmate()){
        setmatchOver(true);
        setMsg('computer win')
        return;
      }

      const moves = chessGame.moves({
        square,
        verbose: true
      });

      if (moves.length === 0) {
        setOptionSquares({});
        return false;
      }

      const newSquares: Record<string, React.CSSProperties> = {};

      for (const move of moves) {
        newSquares[move.to] = {
          background: chessGame.get(move.to) && chessGame.get(move.to)?.color !== chessGame.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
          borderRadius: '50%'
        };
      }

      newSquares[square] = {
        background: 'rgba(255, 255, 0, 0.4)'
      };
      setOptionSquares(newSquares);
      return true;
    }

    function onSquareClick(square: Square, piece?: string) {
      if (!moveFrom && piece) {
        const hasMoveOptions = getMoveOptions(square);

        if (hasMoveOptions) {
          setMoveFrom(square);
        }

        return;
      }

      const moves = chessGame.moves({
        square: moveFrom as Square,
        verbose: true
      });

      const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

      if (!foundMove) {
        const hasMoveOptions = getMoveOptions(square);
        setMoveFrom(hasMoveOptions ? square : '');
        return;
      }

      try {
        chessGame.move({
          from: moveFrom,
          to: square,
          promotion: 'q'
        });
      } catch {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) {
          setMoveFrom(square);
        }
        return;
      }

      setChessPosition(chessGame.fen());
      setTimeout(makeRandomMove, 300);
      setMoveFrom('');
      setOptionSquares({});
    }
    
    
  return (
    <div className='bg-zinc-800 min-h-screen'>
      <div className='flex flex-col w-full items-center justify-center min-h-screen relative'>
          <div>
            <Chessboard id={'click-to-move'} arePiecesDraggable={false} customSquareStyles={optionSquares} onSquareClick={onSquareClick}
              boardWidth={600} position={chessPosition}
              customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
              customDarkSquareStyle={{ backgroundColor: "#769656" }}
            />
          </div>

          {
            matchover && 
            <div className='absolute flex flex-col items-center min-h-screen justify-center w-full bg-black/30'>
                <div className='bg-zinc-700 rounded-sm shadow-xl px-8 py-6 font-manrope w-[480px] h-[240px] transform transition-all'>
                    <div className='space-y-4'>
                        <div className='text-center space-y-2'>
                            <h2 className='text-lg font-manrope font-bold text-gray-800'>Game Ended!</h2>
                            <p className='text-xl font-semibold text-emerald-600'>
                              {msg} 🏆
                            </p>
                            <p className='text-white text-xs py-2'>Try Playing again !</p>
                            <div className='bg-emerald-100 text-emerald-800 px-4 py-1  rounded-full text-xs inline-block'>
                                Game Status: Completed
                            </div>
                            <div className='py-3'>
                              <button className='text-xs text-emerald-100'>
                                <Link to='/dashboard'>back to dashboard</Link>
                              </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
      </div>
    </div>
  )
}
