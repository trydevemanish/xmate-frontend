import { BsFillArrowRightCircleFill } from "react-icons/bs"

function Challengeotherpart() {
  return (
    <div className='pt-5'>
      <p className='text-center text-lg font-semibold font-manrope'>The Game Data will show <span className='text-violet-500'>here.</span></p>
      <div className='grid grid-cols-8 pt-5'>
        <div className='col-start-1 col-end-3 font-manrope'>
          <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center">player turn.</p>
          <div className="flex flex-col gap-1 text-sm font-bold pt-2 px-2">
            <p>player 1</p>
            <p>player 2</p>
          </div>
        </div>
        <div className='col-start-3 col-end-9  ml-[2px]'>
          <p className="bg-violet-500 text-white text-xs font-semibold py-1 text-center mb-[1px]">All moves</p>
          <div className="flex flex-col gap-[1px]">
            <p className="text-center text-sm bg-zinc-500 text-white font-semibold">player1 - d3</p>
            <p className="text-center text-sm bg-zinc-200 font-semibold">player2 - d4</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challengeotherpart
