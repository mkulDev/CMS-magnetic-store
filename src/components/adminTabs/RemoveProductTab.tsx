import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import DrawerItem from '../DrawerItem'
const RemoveProductTab = () => {
  const products = useSelector((state: RootState) => state.productsList.products)
  if (!products) return null
  return (
    <div className='text-grey-800 p-1 md:p-4 mt-8 flex flex-col items-center duration-500 animate-fade overflow-y-hidden'>
      {/* Header */}
      <h2 className='text-2xl md:text-4xl font-bold'>
        <span className='text-blue-500 mr-2'>Remove</span>Products
      </h2>
      <p className='m-2 font-bold text-sm text-center md:px-8'>Caution: Deleting products is an irreversible action. Proceed with caution as this action will permanently remove the product from the database.</p>
      {/* Product Section */}
      <div className='flex flex-wrap justify-center w-full'>
        {products &&
          products.map((item) => (
            <DrawerItem
              key={item.name}
              product={item}
              adminMode={true}
            />
          ))}
      </div>
    </div>
  )
}

export default RemoveProductTab
