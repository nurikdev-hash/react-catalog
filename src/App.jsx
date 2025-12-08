import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Login from './pages/login/Login'
import Catalog from './pages/catalog/Catalog'
import Cart from './pages/cart/Cart'
import Product from './pages/product/Product'
import Profile from './pages/profile/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='' element={<Catalog/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='cart' element={<Cart/>}/>
            <Route path='profile' element={<Profile/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
