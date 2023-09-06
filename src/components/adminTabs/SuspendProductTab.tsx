import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import CustomItem from '../CustomItem'

const SuspendProductTab = () => {
  const products = useSelector((state: RootState) => state.productsList.products)
  if (!products) return null
  return (
    <div className='text-grey-800 p-4 mt-8 flex flex-col items-center duration-500 animate-fade'>
      {/* Header */}
      <h2 className='text-2xl md:text-4xl  font-bold'>
        <span className='text-blue-500 mr-2'>Suspend</span>Product
      </h2>
      {/* Product Section */}
      <div className='flex flex-wrap justify-center'>
        {products &&
          products.map((item) => (
            <CustomItem
              key={item.name}
              item={item}
              mode='suspend'
            />
          ))}
      </div>
    </div>
  )
}

export default SuspendProductTab
