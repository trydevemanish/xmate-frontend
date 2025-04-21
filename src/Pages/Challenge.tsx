import { useParams } from 'react-router'
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess } from 'chess.js';
import { toast } from 'react-toastify';
import { Piece, Square } from 'react-chessboard/dist/chessboard/types';

export default function Challenge() {
  const chess = new Chess()
  const [game, setGame] = useState(chess);
  let params = useParams()
  let gameid = params.gameid;

  function safeGameMutate(modify : any) {
    setGame((g : any) => {
      const update = {
        ...g
      };
      modify(update);
      return update;
    });
  }

  function onDragStart(piece:any){
    if (game.isGameOver()) return toast.error('game ended')

    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

  function onDrop(sourceSquare:Square,targetSquare:Square,piece:Piece){
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    })

    if (move === null) {
      toast.error('invalid move')

      return false
    }
    updateStatus()
    return true;
  }

  function updateStatus(){
      let status = ''

      let moveColor = 'White'

      if (game.turn() === 'b') {
        moveColor = 'Black'
      }

      else if (game.isCheckmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'
      }

      else if (game.isDraw()) {
        status = 'Game over, drawn position'
      }

      else {
        status = moveColor + ' to move'

        if (game.inCheck()) {
          status += ', ' + moveColor + ' is in check'
          toast.info(`${moveColor} is in check`)
        }
    }
  }

  return (
    <div>
      <Chessboard 
        id="BasicBoard"
        position={game.fen()} 
        onPieceDrop={onDrop}
        boardWidth={500}
      />
    </div>
  )
}



