import { Chess, Piece, Square } from 'chess.js';
import React, { SetStateAction, useState } from 'react'
import { Chessboard } from 'react-chessboard';

export default function Randommatch() {
    const [game, setGame] = useState(new Chess());
    const [currentTimeout, setCurrentTimeout] = useState<SetStateAction<number>>();

    function safeGameMutate(modify: ({}: any) => void) {
      setGame((g : any) => {
        const update = {
          ...g
        };
        modify(update);
        return update;
      });
    }
    function makeRandomMove() {
        const possibleMoves = game.moves();
    
        // exit if the game is over
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        safeGameMutate(game => {
          game.move(possibleMoves[randomIndex]);
        });
      }
      function onDrop(sourceSquare : Square, targetSquare:Square, piece:any) {
        const gameCopy : any = {
          ...game
        };
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q"
        });
        setGame(gameCopy);
    
        // illegal move
        if (move === null) return false;
    
        // store timeout so it can be cleared on undo/reset so computer doesn't execute move
        const newTimeout = setTimeout(makeRandomMove, 200);
        setCurrentTimeout(newTimeout);
        return true;
      }
  return (
    <div>
      <Chessboard id="PlayVsRandom" position={game.fen()} boardWidth={500} onPieceDrop={onDrop} customBoardStyle={{
        borderRadius: "4px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
        }} />
    </div>
  )
}
