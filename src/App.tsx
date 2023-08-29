import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Store from './pages/Store'
import Navigation from './components/Navigation'

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/store'
          element={<Store />}
        />
        <Route
          path='/contact'
          element={<Contact />}
        />
      </Routes>
    </>
  )
}

export default App
