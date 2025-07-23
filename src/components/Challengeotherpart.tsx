import { BsFillArrowRightCircleFill } from "react-icons/bs"

function Challengeotherpart() {
  return (
    <div className='pt-5'>
      <p className='text-center text-sm text-white font-manrope'>The Game Data will show <span className='text-violet-500'>here.</span></p>
      <div className='grid grid-cols-8 pt-5'>
        <div className='col-start-1 col-end-3 font-manrope'>
          <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">player turn.</p>
          <div className="flex flex-col text-white gap-1 text-xs pt-2 px-2">
            <p className="flex flex-row items-center justify-center gap-4">
              <span className="bg-green-500 size-2 rounded-full"></span>
              <span>player_1</span>
            </p>
            <p className="flex flex-row items-center justify-center gap-4">
              <span className="size-2 rounded-full"></span>
              <span>player_2</span>
            </p>
          </div>
        </div>
        <div className='col-start-3 col-end-9 ml-[2px]'>
          <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">All moves</p>
          <div className="flex flex-col gap-[1px] text-white">
            <p className="text-center text-xs py-1 bg-zinc-600">player1 - d3</p>
            <p className="text-center text-xs py-1 bg-zinc-700">player2 - d4</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challengeotherpart
