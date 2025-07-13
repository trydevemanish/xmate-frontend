import React from 'react'
import faqtop1 from '../../assets/faqtop1.jpg'

export default function Faqtop() {
  return (
    <div className='pb-16 pt-2 relative'>
        <img src={faqtop1} alt='chessImage' className='object-cover w-full h-[29rem] brightness-50 contrast-100 max-h-[30rem]' />
        <div className='absolute top-10 w-full'>
            <div className='flex flex-col text-white items-center justify-center h-[27rem]'>
                <p className="text-2xl font-yatraone text-center">
                    Challenge, 
                    <span className="text-violet-500">Compete</span>
                    , Conquer -
                </p>
                <div className="flex flex-col gap-4 py-10">
                    <p className="font-manrope leading-7">
                        <span className="font-bold text-xl">xMate: </span> <br />
                        <span className="text-sm">The Ultimate Online Chess Challenge Platform, </span>
                        <span className="text-sm"> Challenge Your Peers, Master the Board – </span>
                        <span className="font-yatraone text-lg">xMate Awaits!</span>
                    </p>
                    <div className='flex flex-row items-center justify-center py-4'>
                        <button className='px-8 text-sm py-1 bg-violet-600  w-fit text-white rounded  hover:bg-violet-500'>Create Your First Match</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  ) 
}
