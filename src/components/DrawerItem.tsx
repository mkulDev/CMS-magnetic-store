import { IoMdClose } from 'react-icons/io'
import { removeFromBasket } from '../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { CartItem } from './ShoppingCart'

type propsTypes = {
  product: CartItem
  index: number
}
const DrawerItem = ({ product, index }: propsTypes) => {
  const dispatch = useDispatch()
  const handleRemove = () => {
    console.log('click')
    dispatch(removeFromBasket(index))
  }

  return (
    <div className='flex items-center m-2 w-full '>
      <img
        src={product.image}
        className='w-12 self-center'
      />
      <div className='flex items-baseline  justify-end'>
        <h3 className='font-bold text-blue-500 mx-2 text-xl'>{product.name}</h3>
        <p>{`${(product.price - product.saleAmount).toFixed(2)} zł`} </p>
      </div>
      <IoMdClose
        size={25}
        className=' hover:text-red-500  cursor-pointer duration-300 ml-auto mr-10'
        onClick={handleRemove}
      />
    </div>
  )
}

export default DrawerItem
