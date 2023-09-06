import { CartItem } from './ShoppingCart'

type propsType = {
  product: CartItem
  onConfirm: () => void
  onCancel: () => void
}

export const Modal = ({ product, onConfirm, onCancel }: propsType) => {
  return (
    <div className='w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] z-10 fixed top-0 left-0 flex justify-center items-center  '>
      <div className='md:w-[500px] w-[300px]  bg-gray-100 shadow-sm p-8 rounded-xl  flex flex-col items-center justify-center '>
        <h2 className='text-blue-500 text-3xl font-bold mb-2'>Warning</h2>
        <p className='text-center mb-2 '>
          Removing a product is an irreversible action. Are you sure that you want to proceed and remove <span className='text-blue-500'>{product.name}</span>?
        </p>
        <div className='flex justify-normal items-center'>
          <button
            onClick={onConfirm}
            className='px-8 py-2 md:w-[120px] bg-gray-400 text-white rounded-xl m-2  hover:bg-blue-500 duration-500 shadow-md'
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className='px-8 py-2 md:w-[120px] bg-gray-400 text-white rounded-xl m-2 hover:bg-blue-500  duration-500 shadow-md'
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
