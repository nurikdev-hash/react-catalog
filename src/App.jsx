import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Login from './pages/login/Login'
import Catalog from './pages/catalog/Catalog'
import Cart from './pages/cart/Cart'
import Product from './pages/product/Product'
import Profile from './pages/profile/Profile'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/userReducer'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      fetch('https://dummyjson.com/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': accessToken,
        },
        // credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setUser(data));
        });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='' element={<Catalog />} />
            <Route path='product' element={<Product />} />
            <Route path='cart' element={<Cart />} />
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
