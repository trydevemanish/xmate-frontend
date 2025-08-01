import React from "react";
import { useNavigate } from "react-router";

type Props = {
  gamehasAlready_2Player: boolean;
  player_2_hasnotJoinedyet: boolean;
  checkIfGameIdValid: boolean;
  checkifGameisCompleted: boolean;
  checkingOtherValidationMessage:boolean;
  warningMessage: string;
  children: React.ReactNode;
};

export default function GameAccessGate({
  gamehasAlready_2Player,
  player_2_hasnotJoinedyet,
  checkIfGameIdValid,
  checkifGameisCompleted,
  checkingOtherValidationMessage,
  warningMessage,
  children,
}: Props) {
  const anyCheckFailed =
    gamehasAlready_2Player ||
    player_2_hasnotJoinedyet ||
    checkIfGameIdValid ||
    checkingOtherValidationMessage ||
    checkifGameisCompleted;

    const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-zinc-600">
      {
        anyCheckFailed ? (
            <div className="bg-zinc-800 min-h-screen relative">
              <div className="absolute flex flex-col items-center justify-center min-h-screen w-full">
                <div className="bg-zinc-600 max-w-md w-96 h-52 rounded-sm">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center justify-center min-h-52 gap-5">
                      <p className="text-emerald-400 text-center font-manrope text-sm">{warningMessage.trim() || "Access denied"}</p>
                      <div className="flex flex-col gap-2 item-center">
                        <button className="bg-zinc-700 text-white hover:bg-zinc-500 rounded-sm text-sm px-4 py-1 self-start" onClick={() => navigate('/dashboard')}>dashboard</button>
                        <p className="text-white text-center text-xs font-manrope">Happy match... 🤗</p>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
        ) : (
            children
        )
      }
    </div>
  );
}
