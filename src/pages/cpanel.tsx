import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { MdAddShoppingCart, MdOutlineBlock } from 'react-icons/md'
import { GoTrash } from 'react-icons/go'
import { AiOutlineUser } from 'react-icons/ai'
import AddProductTab from '../components/adminTabs/AddProductTab'
import SuspendProductTab from '../components/adminTabs/SuspendProductTab'
import RemoveProductTab from '../components/adminTabs/RemoveProductTab'
import { auth } from '../firebase'

type TabName = 'AddProductTab' | 'SuspendProductTab' | 'RemoveProductTab'
const Cpanel = () => {
  const [activetab, setActiveTab] = useState<TabName>('AddProductTab')
  const [isUser, setIsUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const iconSize = window.innerWidth < 1024 ? 20 : 28

  useEffect(() => {
    // Use Firebase's to track user authentication state.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If no user is logged in, navigate to login page.
        navigate('/login')
      } else {
        setIsUser(user)
      }
    })
    // Unsubscribe from the onAuthStateChanged listener when the component unmounts.
    return () => unsubscribe()
  }, [navigate])

  const components = {
    AddProductTab: <AddProductTab />,
    SuspendProductTab: <SuspendProductTab />,
    RemoveProductTab: <RemoveProductTab />
  }

  const handSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('log out')
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message)
        // An error happened.
      })
  }
  if (!isUser) return null
  return (
    <div className='w-[100vw]'>
      <nav className='sticky flex flex-row justify-between h-[80px] w-full bg-gray-200 shadow-md px-4 lg:px-8 items-center text-ms lg:text-xl font-bold text-gray-800 font-[roboto]'>
        <div className='flex gap-2 md:gap-6'>
          <button
            onClick={() => {
              setActiveTab('AddProductTab')
            }}
            className={`flex items-center ${activetab === 'AddProductTab' ? 'text-blue-500' : 'hover:opacity-60 duration-600'} gap-1`}
          >
            <MdAddShoppingCart size={iconSize} />
            add <p className='hidden lg:inline-block'>product</p>
          </button>
          <button
            onClick={() => {
              setActiveTab('SuspendProductTab')
            }}
            className={`flex items-center ${activetab === 'SuspendProductTab' ? 'text-blue-500' : 'hover:opacity-60 duration-600'} gap-1`}
          >
            <MdOutlineBlock size={iconSize} />
            Suspend <p className='hidden lg:inline-block'>product</p>
          </button>
          <button
            onClick={() => {
              setActiveTab('RemoveProductTab')
            }}
            className={`flex items-center ${activetab === 'RemoveProductTab' ? 'text-blue-500' : 'hover:opacity-60 duration-600'} gap-1`}
          >
            <GoTrash size={iconSize} />
            Remove <p className='hidden lg:inline-block'>product</p>
          </button>
        </div>
        {
          <button
            onClick={handSignOut}
            className={`flex items-center hover:text-blue-500 duration-500`}
          >
            <AiOutlineUser size={iconSize} />
            Logout
          </button>
        }
      </nav>
      {components[activetab]}
    </div>
  )
}

export default Cpanel
