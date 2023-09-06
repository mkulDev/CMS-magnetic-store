import { useState } from 'react'
import { getAllProducts, uploadFileToFirestore, uploadProduct } from '../../firebase'
import CustomItem from '../CustomItem'
import { useDispatch } from 'react-redux'
import { updateProducts } from '../../redux/productsSlice'

/* import { products } from '../../data/products'
import { CartItem } from './ShoppingCart' - for upload multiple products from file */

type statusMessage = {
  error: boolean
  message: string
}

const initialState = {
  name: '',
  description: '',
  category: '',
  price: '',
  image: '',
  sale: false,
  saleAmount: '',
  suspend: false
}

const AddProductTab = () => {
  const [statusMessage, setStatusMessage] = useState<statusMessage | null>(null)
  const [isSale, setIsSale] = useState<boolean>(false)
  const [newProduct, setNewProduct] = useState(initialState)
  const dispatch = useDispatch()
  // Function for adding multiple products from file
  /*const addMultipleProduct = (productArr: CartItem[]) => {
    productArr.forEach((element) => uploadProduct(element))
  }
  addMultipleProduct(products)
*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const { name, value } = e.target
    const checkImage = Boolean(/\.(jpg|jpeg|png)$/i.test(value) && name === 'image')

    if (checkImage) {
      const myfile = e.target.files[0]

      setNewProduct({
        ...newProduct,
        [name]: myfile
      })
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      })
    }
  }

  const toggleSale = () => {
    setIsSale(!isSale)
    const updatedProduct = {
      ...newProduct,
      sale: !isSale,
      saleAmount: isSale ? '0' : ''
    }
    setNewProduct(updatedProduct)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const downloadURL = await uploadFileToFirestore(newProduct.image, newProduct.name)
    const product = { ...newProduct, image: downloadURL }
    const message = await uploadProduct(product)
    setStatusMessage(message)
    setNewProduct(initialState)
    getAllProducts('products').then((products) => {
      dispatch(updateProducts(products))
    }) // Reset the form
  }

  const isFormValid = {
    name: Boolean(newProduct.name?.length >= 3),
    category: Boolean(newProduct.category?.length >= 3),
    description: Boolean(newProduct.description?.length >= 25),
    price: Boolean(Number(newProduct.price) >= 1),
    saleAmount: Boolean((!newProduct.sale && Number(newProduct.saleAmount) === 0) || (newProduct.sale && Number(newProduct.saleAmount) >= 1)),
    saleCheck: Boolean(Number(newProduct.saleAmount) < Number(newProduct.price)),
    image: Boolean(newProduct.image)
  }

  const isFormDisabled = !Object.values(isFormValid).every((element) => element === true)

  return (
    <div className='flex flex-wrap h-[calc(100vh-80px)] - 80px) lg:flex-nowrap justify-center items-center py-8'>
      <div className=' w-full lg:w-1/3 flex flex-col items-center'>
        <h2 className='text-xl md:text-4xl font-bold'>
          <span className='text-blue-500 font-bold'>Add</span> new product (preview)
        </h2>
        <CustomItem
          item={newProduct}
          mode='disabled'
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className=' py-8 px-6  flex flex-col rounded-xl w-[90vw] md:w-[500px] lg:w-[600px] bg-gray-100 shadow-lg border-t-2 '
      >
        {/* product name*/}
        <label
          htmlFor='name'
          className='pl-2'
        >
          Product name:
        </label>
        <input
          onChange={handleInputChange}
          type='text'
          placeholder='Name'
          name='name'
          value={newProduct.name}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        {/* product category*/}
        <label
          htmlFor='category'
          className='pl-2'
        >
          Product category:
        </label>
        <input
          onChange={handleInputChange}
          type='text'
          placeholder='Category'
          name='category'
          value={newProduct.category}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        {/* product description*/}
        <label
          htmlFor='description'
          className='pl-2'
        >
          Product description:
        </label>
        <textarea
          rows={6}
          onChange={handleInputChange}
          placeholder='The description should be at least 25 characters long'
          name='description'
          value={newProduct.description}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        {/* product image*/}
        <label
          htmlFor='image'
          className='pl-2'
        >
          Product Image:
        </label>
        <input
          type='file'
          name='image'
          accept='.jpg, .jpeg, .png'
          onChange={handleInputChange}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        {/* product price*/}
        <label
          htmlFor='price'
          className='pl-2'
        >
          Product price:
        </label>
        <input
          onChange={handleInputChange}
          type='number'
          placeholder='Price'
          name='price'
          value={newProduct.price}
          className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none'
        />
        {/* product sale*/}
        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center'>
            <label
              htmlFor='sale'
              className='p-2'
            >
              Sale:
            </label>
            <div className={`relative ${isSale ? 'bg-blue-200' : 'bg-gray-200'} w-[40px] h-[20px] rounded-xl border-2 flec items-center`}>
              <button
                type='button'
                name='sale'
                onClick={toggleSale}
                className={`w-[20px] h-[20px] rounded-full transistion-all  absolute top-[-2px] ${isSale ? 'bg-blue-500 right-0' : 'bg-gray-400 left-0'} duration-500 cursor-pointer`}
              />
            </div>
          </div>
          {/* sale amount*/}

          <input
            onChange={handleInputChange}
            type='number'
            placeholder='Sale Amount'
            name='saleAmount'
            value={isSale ? newProduct.saleAmount : 0}
            disabled={!isSale}
            className='px-6 py-2 mb-2 rounded-md bg-gray-200 focus:outline-none w-[60%]'
          />
        </div>
        {/* submit button*/}
        <button
          type='submit'
          disabled={isFormDisabled}
          className={`px-6 py-2 mt-4 ${isFormDisabled ? 'bg-gray-400' : 'bg-blue-500'} rounded-lg text-white hover:opacity-60 duration-500 w-[150px] self-center`}
        >
          Add Product
        </button>
        {statusMessage && <p className={`${statusMessage.error ? 'text-red-600' : 'text-green-500'} m-2 text-sm text-center`}>{statusMessage.message}</p>}
      </form>
    </div>
  )
}

export default AddProductTab
