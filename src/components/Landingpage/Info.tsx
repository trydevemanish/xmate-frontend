import InfoImage from '../../assets/headerimg1.png'
import smallImage from '../../assets/scroll7.avif'

export default function Info() {
  return (
    <div className="bg-violet-300">
        <div className="px-32 py-16 grid grid-cols-2"> 
            <div className='col-start-1 col-end-2'>
                <img src={InfoImage} alt="infoImage" className='min-w-80 w-[25rem] max-w-[26rem] min-h-64 h-72 max-h-[24rem] rounded hover:-translate-y-1  hover:transform-gpu hover:duration-300'/>
            </div>
            <div className='col-start-2 col-end-3 flex flex-col'>
                <p className='font-yatraone text-white text-2xl'>Challenge Your Friends to a Game of Chess – Anytime, Anywhere!</p>
                <p className='font-manrope font-semibold leading-6 text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, possimus? Facere architecto nobis, rerum accusantium libero quas vero recusandae sapiente suscipit quidem ea delectus, laboriosam fuga provident laudantium eveniet molestiae?</p>
                <div className='flex items-end justify-between'>
                    <button className='bg-violet-600 text-white py-2 px-16 rounded shadow-md shadow-violet-300 hover:bg-violet-500 '>Create your first match.</button>
                    <img src={smallImage} alt="secondImage" className='min-w-28 w-32 max-w-96 rounded-md shadow-md shadow-violet-300' />
                </div>
            </div>
        </div>
    </div>
  )
}