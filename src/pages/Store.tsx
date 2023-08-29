import React, { useState } from 'react'
import { products } from '../data/products'
import CustomItem from '../components/CustomItem'

const Store = () => {
  const [items, setItems] = useState(products)
  return (
    <div className='text-grey-800 p-4 mt-8 flex flex-col items-center'>
      <h1 className='text-4xl  font-bold'>Store</h1>
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
