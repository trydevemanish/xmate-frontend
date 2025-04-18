import { CgMail } from 'react-icons/cg'
import profileheader from '../assets/profileheader.avif'
import profile from '../assets/scroll3.jpg'
import { BsTwitterX } from 'react-icons/bs'
import FaqCard from './FaqCard'
import { HiOutlineEmojiSad } from 'react-icons/hi'

const userStatsCardData= [
  {
    label1:'No of Games played',
    label2:'7'
  },
  {
    label1:'No of Games win',
    label2:'4'
  },
  {
    label1:'No of Games lossed',
    label2:'2'
  },
  {
    label1:'No of Games draw',
    label2:'1'
  }
]


const userfieldOptions = [
  {
      id:1,
     text : 'Name' 
  },
  {
      id:2,
     text : 'Game played' 
  },
  {
      id:3,
     text : 'Win' 
  },
  {
      id:4,
     text : 'losses' 
  },
  {
      id:5,
     text : 'draw' 
  }
]

type userfieldOptionsType = {
  id:number,
  text:string
}

export default function Profile() {
  return (
    <div className="px-52 min-h-screen bg-gradient-to-b from-white via-violet-100 to-white">
      <img src={profileheader} alt="profile image" className='w-full relative object-cover max-h-40 ' />
      <div>
        <img src={profile} alt="profile" className='size-24 object-cover absolute top-28 rounded-full shadow shadow-violet-200 border left-[220px]'/>
      </div>
      <div className='pt-[53px] grid grid-cols-2'>
        <div className='col-start-1 py-3 px-6 col-end-2 flex flex-col gap-3 text-sm font-manrope font-semibold'>
          <p>Name: manish</p>
          <p className='text-xs opacity-55 flex gap-1 items-center'>
            <span><CgMail className='size-3' /></span>
            <span>msh@17679@gmail.com</span>
          </p>
          <p className='opacity-50 text-xs flex gap-1 items-center'>
            <span><BsTwitterX className='size-3' /></span>
            <span>@manish_11</span>
          </p>
        </div>
        <div className='col-start-2 col-end-3'>
          <div className="flex flex-col gap-2 items-center place-content-center text-xs">
            {userStatsCardData.map((data,idx:number) => (
              <FaqCard label1={data?.label1} label2={data?.label2} key={idx} classNamelabel1='bg-violet-300 font-manrope px-3 py-1 text-xs' classNamelabel2='bg-gray-200 px-3' />
            ))}
          </div>
        </div>
      </div>

      <div className='pt-8'>
        <div className='grid grid-cols-5 gap-[1px]'>
            {userfieldOptions.map((data:userfieldOptionsType) => (
                <p key={data?.id} className='text-center text-white py-1 font-manrope font-semibold text-xs bg-violet-500'>{data?.text}</p>
            ))}
        </div>
        <div className='flex gap-1 justify-center items-center pt-3'>
            <HiOutlineEmojiSad className='size-5' />
            <p className='text-center'>no data available!</p>
        </div>
      </div>
    </div>
  )
}
