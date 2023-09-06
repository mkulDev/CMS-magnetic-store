import { NavLink, useLocation } from 'react-router-dom'
import { BiHomeAlt } from 'react-icons/bi'
import { AiOutlineAppstore } from 'react-icons/ai'
import { RiContactsLine } from 'react-icons/ri'
import ShoppingCart from './ShoppingCart'

const Navigation = () => {
  const location = useLocation()
  return (
    <nav className={`bg-gray-100 shadow-md h-[80px] w-full flex justify-between items-center px-4 sm:px-8`}>
      <div className='flex gap-4 text-sm md:text-2xl font-bold'>
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

      {location.pathname === '/store' && <ShoppingCart />}
    </nav>
  )
}

export default Navigation
