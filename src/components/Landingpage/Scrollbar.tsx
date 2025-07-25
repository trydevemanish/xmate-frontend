import { FaChessKing } from "react-icons/fa"
import Scroll1 from '../../assets/scroll1.jpg'
import Scroll2 from '../../assets/scroll2.jpg'
import Scroll3 from '../../assets/scroll3.jpg'
import Scroll4 from '../../assets/scroll4.jpg'
import Scroll5 from '../../assets/scroll5.webp'
import Scroll6 from '../../assets/scroll6.jpeg'
import Scroll7 from '../../assets/scroll7.avif'

const Scroll = [
    {
        image : Scroll1,
        text : 'ok1'
    },
    {
        image : Scroll2,
        text : 'ok2'
    },
    {
        image : Scroll3,
        text : 'ok3'
    },
    {
        image : Scroll4,
        text : 'ok4'
    },
    {
        image : Scroll5,
        text : 'ok5'
    },
    {
        image : Scroll6,
        text : 'ok6'
    },
    {
        image : Scroll7,
        text : 'ok7'
    }
]

export default function Scrollbar() {
  return (
    <div className="py-4">
      <p className="text-xl font-yatraone flex gap-2 items-end px-16">
        <span>- Play Smart. Win Big</span>
        <span><FaChessKing className="text-violet-500 size-10 pb-2" /></span>
      </p>
      <div className="flex scrollbar-hide overflow-x-auto py-10 gap-[2px]">
        {Scroll.map((data,idx:number) => (
            <div key={idx} className="flex flex-col gap-2">
                <img src={data?.image} alt="scroll1" className="min-w-40 w-60 max-w-[25rem] min-h-48 h-auto max-h-[24rem] hover:-translate-y-2 hover:transform hover:duration-300 hover:contrast-125 brightness-75 hover:shadow-md hover:shadow-violet-300 rounded-b" />
                <p className="text-xs font-manrope text-center">{data?.text}</p>
            </div>
        ))}
      </div>
    </div>
  )
}
