import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess, Move } from 'chess.js';
import { CustomSquareStyles, Square } from 'react-chessboard/dist/chessboard/types';
import { toast } from "react-toastify";
import Challengeotherpart from "../components/Challengeotherpart";

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
      <div className="grid grid-cols-2 min-h-screen">
        <div className="col-start-1 col-end-2">
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
                  borderRadius: "4px",
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
        <div className="col-start-2 col-end-3">
          <Challengeotherpart />
        </div>
      </div>
  )
}