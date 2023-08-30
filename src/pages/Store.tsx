import React, { useState } from 'react'
import { products } from '../data/products'
import CustomItem from '../components/CustomItem'
import { CartItem } from '../components/ShoppingCart'

const Store = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const [items, setItems] = useState<CartItem[]>(products)
  const categories = ['All', ...new Set(products.map((element: CartItem) => element.category))]

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    category === 'All' ? setItems(products) : setItems(products.filter((element: CartItem) => element.category === category))
  }

  return (
    <div className='text-grey-800 p-4 mt-8 flex flex-col items-center duration-500'>
      <h1 className='text-4xl  font-bold'>
        <span className='text-blue-500 mr-2'>Magnetic</span>Store
      </h1>
      <div>
        {categories.map((category) => {
          return (
            <button
              className={`text-xl m-2 cursor-pointer hover:opacity-60 ${activeCategory === category ? 'text-blue-500 font-bold' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          )
        })}
      </div>
      <div className='flex flex-wrap justify-center'>
        {items &&
          items.map((item) => (
            <CustomItem
              key={item.id}
              {...item}
            />
          ))}
      </div>
    </div>
  )
}

export default Store
