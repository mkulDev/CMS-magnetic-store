import { IoMdClose } from 'react-icons/io'
import { removeFromBasket } from '../redux/cartSlice'
import { updateProducts } from '../redux/productsSlice'
import { useDispatch } from 'react-redux'
import { CartItem } from './ShoppingCart'
import { useState } from 'react'
import { Modal } from './Modal'
import { deleteProduct, getAllProducts, deleteFileFromFireStore } from '../firebase'

type propsTypes = {
  product: CartItem
  index: number
  adminMode: boolean
}

const DrawerItem = ({ product, index, adminMode }: propsTypes) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()

  const handleRemove = () => {
    dispatch(removeFromBasket(index))
  }

  const handleDelete = () => {
    setShowModal(!showModal)
  }

  const confirmDelete = async () => {
    await deleteFileFromFireStore(product.image)
    await deleteProduct(product.name)

    getAllProducts('products').then((products) => {
      dispatch(updateProducts(products))
    })
    setShowModal(false)
  }

  const cancelDelete = () => {
    setShowModal(false)
  }

  return (
    <div className={` flex items-center  w-full ${adminMode ? ' justify-between shadow-lg m-2 px-2 py-1 lg:px-6 lg:py-3 md:w-2/3 lg:min-w-[500px] lg:w-2/5 rounded-xl border-2' : 'm-2'} `}>
      <img
        src={product.image}
        className={`${adminMode ? 'w-12 md:w-[80px] md:h-[80px] lg:w-[100px]  lg:h-[100px]' : 'w-12'} self-center`}
      />
      <div className='flex items-baseline  justify-end'>
        <h3 className='font-bold text-blue-500 mx-2 text-sm md:text-xl '>{product.name}</h3>
        <p className='text-sm md:text-base '>{`${(product.sale ? parseFloat(product.price) : parseFloat(product.price) - parseFloat(product.saleAmount)).toFixed(2)} zł`} </p>
      </div>
      {!adminMode && (
        <IoMdClose
          size={25}
          className=' hover:text-red-500  cursor-pointer duration-300 ml-auto mr-10'
          onClick={handleRemove}
        />
      )}
      {adminMode && (
        <button
          onClick={() => handleDelete()}
          className={`px-3 py-1 md:m-2 md:px-6 md:py-2 rounded-lg duration-500 hover:bg-red-500 shadow-md text-white bg-red-700 cursor-pointer`}
        >
          Delete
        </button>
      )}
      {showModal && (
        <Modal
          product={product}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}

export default DrawerItem
