import { useEffect, useState } from 'react'
import { TiShoppingCart } from 'react-icons/ti'
import Drawer from './DrawerCart'
import { useSelector } from 'react-redux'

export type CartItem = {
  name: string
  description: string
  category: string
  price: string
  image: string | File
  sale: boolean
  saleAmount: string
  suspend: boolean
}

export type RootState = {
  cart: { basket: CartItem[]; totalPrice: number }
  // Define other properties of your root state here
}

const ShoppingCart = () => {
  const basket = useSelector((state: RootState) => state.cart.basket)
  const totalAmount = useSelector((state: RootState) => state.cart.totalPrice)
  const [numberOfCartItems, setNumberOfCartItems] = useState<number>(0)

  useEffect(() => {
    setNumberOfCartItems(basket.length)
  }, [basket])

  // Toggle cart drawer
  const [open, setOpen] = useState<boolean>(false)

  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)

  return (
    <>
      <div className='flex items-center gap-2 '>
        <div
          className=' relative hover:text-blue-500 duration-500 cursor-pointer border-2 border-[#ccc] rounded-2xl p-2'
          onClick={openDrawer}
        >
          <TiShoppingCart size={32} />
          {numberOfCartItems >= 1 && <p className='rounded-full text-sm bg-gray-800 text-white absolute bottom-[-10px] right-[-10px]  h-6 w-6 flex items-center justify-center'>{numberOfCartItems}</p>}
        </div>
        <p className='  hidden sm:block w-[80px] text-sm font-bold'>{totalAmount.toFixed(2)} zł</p>
      </div>
      <Drawer
        open={open}
        closeDrawer={closeDrawer}
      />
    </>
  )
}

export default ShoppingCart
