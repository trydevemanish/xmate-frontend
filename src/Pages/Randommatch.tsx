import { Chess} from 'chess.js';
import { useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard';
import { Square } from 'react-chessboard/dist/chessboard/types';

export default function Randommatch() {
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [moveFrom, setMoveFrom] = useState('');
    const [optionSquares, setOptionSquares] = useState({});

    function makeRandomMove() {
      const possibleMoves = chessGame.moves();

      if (chessGame.isGameOver()) {
        return;
      }
      const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      chessGame.move(randomMove);
      setChessPosition(chessGame.fen());
    }

    function getMoveOptions(square: Square) {
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
    <div>
      <Chessboard id={'click-to-move'} arePiecesDraggable={false} customSquareStyles={optionSquares} onSquareClick={onSquareClick}  boardWidth={500} position={chessPosition}
      customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
      customDarkSquareStyle={{ backgroundColor: "#769656" }}
      />
    </div>
  )
}
