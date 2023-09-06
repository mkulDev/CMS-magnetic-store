import { useDispatch } from 'react-redux'
import { addToBasket, getTotalPrice } from '../redux/cartSlice'
import { CartItem } from './ShoppingCart'
import { suspendProduct, getAllProducts } from '../firebase'
import { updateProducts } from '../redux/productsSlice'
import { useState } from 'react'

const CustomItem: React.FC<{ item: CartItem; mode: 'add' | 'suspend' | 'disabled' }> = ({ item, mode }) => {
  const [isSuspend, setIsSuspened] = useState(item.suspend)

  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addToBasket(item))
    dispatch(getTotalPrice())
  }

  const handleStatusChange = (item: CartItem) => {
    suspendProduct(item)
    getAllProducts('products').then((products) => {
      dispatch(updateProducts(products))
      setIsSuspened(!isSuspend)
    })
  }

  item.image instanceof Blob ? URL.createObjectURL(item.image) : ''

  return (
    <div className='flex flex-col items-center self-center p-4 m-4 shadow-md rounded-lg w-[250px] md:w-[300px] lg:w-[350px] hover:scale-105 duration-300 animate-fade '>
      <img
        src={!item.image ? '../../public/images/customproduct.jpg' : item.image instanceof Blob ? URL.createObjectURL(item.image) : (item.image as string)}
        alt={item.name}
        loading='lazy'
        className='bg-gray-200 h-[200px] md:h-[250px] '
      />

      <h2 className='text-md md:text-lg lg:text-xl font-bold my-1 md:my-2'>{item.name}</h2>
      <p className='px-1 md:px-2 text-center text-xs md:text-sm lg:text-base'>{item.description}</p>
      <div className='font-bold flex  items-baseline my-1 md:my-2'>
        {item.price && <p className={`${item.sale ? 'text-red-700 text-xs md:text-sm line-through mr-2' : 'text-base'}`}>{`${item.price} zł`}</p>}

        {item.sale && item.saleAmount && <p className='text-sm md:text-lg'>{`${(parseFloat(item.price) - parseFloat(item.saleAmount)).toFixed(2)} zł`}</p>}
      </div>
      {(mode === 'disabled' || mode === 'add') && (
        <button
          onClick={handleSubmit}
          className='px-4 py-2 m-1 md:m-2 lg: bg-gray-800 text-white  hover:bg-blue-500 rounded-lg duration-500'
          disabled={mode === 'disabled'}
        >
          Add to Cart
        </button>
      )}
      {mode === 'suspend' && (
        <button
          onClick={() => handleStatusChange(item)}
          className={`px-8 py-2 m-4 rounded-lg text-sm md:text-lg duration-500 hover:opacity-60 shadow-md text-white ${isSuspend ? 'bg-yellow-500' : 'bg-blue-500'} cursor-pointer`}
        >
          {isSuspend ? 'suspend' : 'active'}
        </button>
      )}
    </div>
  )
}

export default CustomItem
