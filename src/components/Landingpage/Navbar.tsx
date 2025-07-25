import { Link, useNavigate } from 'react-router'
import Icon from '../../assets/chessicon.png'

const menuitem = [
  {
    name : 'About'
  },
  {
    name : 'Login'
  }
]

type menuitem = {
  name : string
}

export default function Navbar() {
  const navigate = useNavigate()

  function handleMenuRouting(menu:string){
    if(menu == 'Login'){
      navigate('/login')
    }
  }

  return (
   <div className='px-16 py-2'>
    <div className='flex justify-between item-center'>
      <div className='flex item-center gap-2'>
        <img src={Icon} alt="logo" className='size-6' />
        <p className='text-2xl font-yatraone text-violet-600 font-bold'>xMate</p>
      </div>
      <div className='flex items-center text-sm gap-8'>
        {
          menuitem.map((item:menuitem,idx:number) => (
            <p key={idx} className='cursor-pointer' onClick={() => handleMenuRouting(item.name)}>
              {item.name}
            </p>
          ))
        }
        <button className='px-4 py-1 bg-violet-600 text-white rounded shadow-violet-200 shadow-md hover:bg-violet-500'>
          <Link to={'/dashboard'} >dashboard</Link>
        </button>
      </div>
    </div>
   </div>
  )
}
