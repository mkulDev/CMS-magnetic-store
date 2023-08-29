import { NavLink, useLocation } from 'react-router-dom'
import { BiHomeAlt } from 'react-icons/bi'
import { AiOutlineAppstore } from 'react-icons/ai'
import { RiContactsLine } from 'react-icons/ri'
import ShoppingCart from './ShoppingCart'

const Navigation = () => {
  const location = useLocation()
  return (
    <nav className='flex justify-between h-[80px] bg-gray-200 shadow-md gap-8 px-8 items-center text-sxl font-bold text-gray-800 font-[roboto] sticky'>
      <div className='flex gap-4'>
        <NavLink
          to='/'
          className={`hover:opacity-60 duration-500 flex items-center gap-1 ${location.pathname === '/' ? 'text-blue-500' : ''}`}
        >
          <BiHomeAlt size={20} />
          Home
        </NavLink>
        <NavLink
          to='/store'
          className={`hover:opacity-60 duration-500 flex items-center gap-1 ${location.pathname === '/store' ? 'text-blue-500' : ''}`}
        >
          <AiOutlineAppstore size={20} />
          Store
        </NavLink>
        <NavLink
          to='/contact'
          className={`hover:opacity-60 duration-500 flex items-center gap-1 ${location.pathname === '/contact' ? 'text-blue-500' : ''}`}
        >
          <RiContactsLine size={20} />
          Contact
        </NavLink>
      </div>
      <div>
        <ShoppingCart />
      </div>
    </nav>
  )
}

export default Navigation
