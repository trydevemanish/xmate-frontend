import Icon from '../../assets/chessicon.png'

export default function Navbar() {
  return (
   <div className='px-16 py-2'>
    <div className='flex justify-between item-center'>
      <div className='flex item-center gap-2'>
        <img src={Icon} alt="logo" className='size-6' />
        <p className='text-2xl font-yatraone text-violet-600 font-bold'>xMate</p>
      </div>
      <div className='flex items-center text-xs gap-8'>
        <p>About</p>
        <p>Login</p>
        <button className='px-4 py-1 bg-violet-600 text-white rounded shadow-violet-200 shadow-md hover:bg-violet-500'>dashboard</button>
      </div>
    </div>
   </div>
  )
}
