import { useEffect, useState } from 'react'
import CustomItem from '../components/CustomItem'
import { CartItem } from '../components/ShoppingCart'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const Store = () => {
  const products = useSelector((state: RootState) => state.productsList.products)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [items, setItems] = useState<CartItem[] | null>([])
  const categories = ['All', ...new Set(products.map((element: CartItem) => element.category))]

  useEffect(() => {
    // Update the items when products change
    if (products) {
      setItems(products)
    }
  }, [products])

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    category === 'All' ? setItems(products) : setItems(products.filter((element: CartItem) => element.category === category))
  }

  if (!items) return null

  return (
    <div className='text-grey-800 p-4 mt-8 flex flex-col items-center duration-500 animate-fade'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
        <span className='text-blue-500 mr-2'>Magnetic</span>Store
      </h1>
      <div className='flex flex-wrap justify-center'>
        {/* we screen categories only when they loaded */}
        {categories.length > 1 &&
          categories.map((category, index) => {
            return (
              <button
                key={index}
                className={`text-md sm:text-xl m-2 cursor-pointer hover:opacity-60 ${activeCategory === category ? 'text-blue-500 font-bold' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            )
          })}
      </div>
      <div className='flex flex-wrap justify-center '>
        {items &&
          items.map((item) => (
            <CustomItem
              key={item.name}
              mode={'add'}
              item={item}
            />
          ))}
      </div>
    </div>
  )
}

export default Store
