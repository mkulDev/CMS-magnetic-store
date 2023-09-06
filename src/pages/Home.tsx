import Image from '../assets/store.jpg'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigation = useNavigate()
  return (
    <div className='bg-gray-100 min-h-screen '>
      <header className='bg-blue-500  text-white flex flex-col lg:flex-row '>
        <div className='flex flex-col justify-center items-start lg:w-[40%] p-[5%] '>
          <div className='flex flex-col justify-start my-8'>
            <span className='text-gray-800 font-[900] text-xl xl:text-3xl'>Welcome to</span>
            <h1 className='text-3xl xl:text-5xl font-bold text-white'>Magnetic Store</h1>

            <p className='text-xs lg:text-sm my-1 xl:my-2 '>
              At Magnetic Store, we are dedicated to providing you with a premium mobile shopping experience. Explore our vast selection of cutting-edge smartphones, trendy accessories, and unbeatable deals.
            </p>
            <button
              onClick={() => {
                navigation('/store')
              }}
              className='mt-4 border-[1px] bg-blue-400 border-[text-gray-100] text-white text-sm lg:text-base px-2 py-1 lg:px-4 lg:py-2 md:mt-2 rounded-sm hover:opacity-60 duration-500 shadow-md w-[100px] md:w-[120px] '
            >
              Shop Now
            </button>
          </div>
        </div>
        <img
          src={Image}
          className='w-full lg:w-[60%] shadow-sm'
        />
      </header>

      <section className='container  p-8'>
        <h2 className='text-3xl font-semibold mb-4'>
          Featured <span className='text-blue-500'>Products</span>{' '}
        </h2>
        <p className='text-lg py-2'>Your one-stop shop for the latest mobile phones and accessories!</p>
        {/* Display featured products here */}
      </section>

      <section className='bg-gray-200 p-8 '>
        <h2 className='text-3xl font-semibold mb-4'>
          About <span className='text-blue-500'>Magnetic</span>
        </h2>
        <p>We offer the latest mobile phone models from top brands at competitive prices. Explore our wide range of products and find the perfect phone for your needs.</p>
      </section>

      <section className='container  p-8'>
        <h2 className='text-3xl font-semibold mb-4'>
          Contact <span className='text-blue-500'>Us</span>
        </h2>
        <p className='flex items-center gap-1 '>Magnetic Store Sp.z o.o.</p>

        <p className='flex items-center gap-1'>+48 123 456 789</p>
        <p className='flex items-center gap-1'>magneticstore.com.pl</p>
        <p className='flex items-center gap-1'>ul. Grunwaldzka 12, 35-152 Wrocław</p>
        <p className='flex items-center gap-1'>contact@magneticstore.com</p>
      </section>

      <footer className='bg-blue-500 text-white text-center py-4'>
        <p>&copy; 2023 Magnetic Store. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home
