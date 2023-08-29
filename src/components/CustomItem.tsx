import React from 'react'
import { useDispatch } from 'react-redux'
import { addToBasket, getTotalPrice } from '../redux/cartSlice'
import { CartItem } from './ShoppingCart'

const CustomItem = (item: CartItem) => {
  const dispatch = useDispatch()

  const handleSubmit = () => {
    dispatch(addToBasket(item))
    dispatch(getTotalPrice())
  }

  return (
    <div className='flex flex-col items-center p-4 m-4 shadow-md rounded-lg w-[350px] hover:scale-105 duration-300 '>
      <img src={item.image} />
      <h2 className='text-xl font-bold my-2'>{item.name}</h2>
      <p>{item.description}</p>
      <div className='font-bold flex  items-end m-2'>
        <p className={`${item.sale ? 'text-red-700 text-sm line-through mr-2' : 'text-lg'}`}>{`${item.price} zł`}</p>

        {item.sale && <p className='text-2xl'>{`${(item.price - item.saleAmount).toFixed(2)} zł`}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className='px-4 py-2 m-4 bg-gray-800 text-white  hover:bg-blue-500 rounded-lg duration-500'
      >
        Add to Cart
      </button>
    </div>
  )
}

export default CustomItem
