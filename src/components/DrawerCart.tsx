import { SlClose } from 'react-icons/sl'
import DrawerItem from './DrawerItem'
import { useSelector } from 'react-redux'
import { RootState } from './ShoppingCart'
type drawerProps = {
  open: boolean
  closeDrawer: () => void
}

const DrawerCart = ({ open, closeDrawer }: drawerProps) => {
  const basket = useSelector((state: RootState) => state.cart.basket)
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)

  const DrawerClosed = open ? ' translate-x-0' : 'translate-x-full'
  return (
    <div className={`fixed flex flex-col  justify-between h-full lg:w-[30vw] md:w-full rounded-l-xl  bg-white z-[100] top-0 right-0 px-8 py-12 ${DrawerClosed}  transition-transform duration-1000 shadow-lg`}>
      <div className='flex flex-row justify-between border-b-2 pb-8'>
        <h2 className='text-xl inline-block'>
          <span className='text-blue-500 text-2xl mr-1'>Cart</span> content
        </h2>
        <SlClose
          size={30}
          className='cursor-pointer hover:opacity-50 duration-500'
          onClick={closeDrawer}
        />
      </div>
      <div
        className='custom-scrollbar flex flex-col h-full justify-start mt-8'
        style={{ maxHeight: '55vh', overflowY: 'auto', overflowX: 'hidden' }}
      >
        {basket.map((product, i) => (
          <DrawerItem
            key={i}
            index={i}
            product={product}
          />
        ))}
      </div>
      <div />
      {basket.length > 0 && (
        <div className=''>
          <h3 className='text-xl  border-b-2 pb-2 mb-4'>
            <span className='text-blue-500 text-2xl '>Order</span> summary
          </h3>
          <p>Number of Items in Order: {basket.length}</p>
          <p>
            Total Order Price: <span className='text-blue-500 text-xl'> {totalPrice.toFixed(2)} zł</span>
          </p>
          <button className='px-6 py-2 bg-blue-500 rounded-lg text-white my-4'>Purchase</button>
        </div>
      )}
    </div>
  )
}

export default DrawerCart
