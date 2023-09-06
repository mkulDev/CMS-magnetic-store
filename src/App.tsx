import { Routes, Route, useLocation } from 'react-router-dom'
import { getAllProducts } from './firebase'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Store from './pages/Store'
import NavigationBar from './components/Navigation'
import Login from './pages/Login'
import Cpanel from './pages/cpanel'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateProducts } from './redux/productsSlice'

// Inside your component

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const isCpanelRoute = location.pathname === '/cpanel'

  useEffect(() => {
    getAllProducts('products').then((products) => {
      dispatch(updateProducts(products))
    })
  }, [dispatch])

  return (
    <>
      {!isCpanelRoute && <NavigationBar />}
      <Routes location={location}>
        <Route
          path='/'
          element={<Home />}
          key='home' // Set a unique key for the Home route
        />
        <Route
          path='/store'
          element={<Store />}
          key='store' // Set a unique key for the Store route
        />
        <Route
          path='/contact'
          element={<Contact />}
          key='contact' // Set a unique key for the Contact route
        />
        <Route
          path='/login'
          element={<Login />}
          key='login' // Set a unique key for the Login route
        />
        <Route
          path='/cpanel'
          element={<Cpanel />}
          key='cpanel' // Set a unique key for the Cpanel route
        />
      </Routes>
    </>
  )
}

export default App
