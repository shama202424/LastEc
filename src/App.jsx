
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Details from './Components/Details/Details'
import Logout from './Components/Logout/Logout'
import Card from './Components/Card/Card'
import Products from './Components/Products/Products'
import UserContextProvider from './Context/UserContext'
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting'
import ProductDetails from './Components/ProductDetaild/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './Components/checkOut/CheckOut'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Wishlist from './Components/Wishlist/Wishlist'


function App() {
  let Query = new QueryClient()

  let x = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element:<ProtectedRouting><Home/></ProtectedRouting> },
        { path: 'wishlist', element:<ProtectedRouting><Wishlist/></ProtectedRouting> },
        { path: 'card', element:<ProtectedRouting><Card/></ProtectedRouting>},
        { path: 'categories', element:<ProtectedRouting><Categories/></ProtectedRouting>},
        { path: 'brands', element:<ProtectedRouting><Brands/></ProtectedRouting>},
        { path: 'products', element:<ProtectedRouting><Products/></ProtectedRouting> },
        { path: 'CheckOut', element:<ProtectedRouting><CheckOut/></ProtectedRouting> },
        { path: 'details', element:<ProtectedRouting><Details/></ProtectedRouting> },
        { path: 'productDetails/:id/:category', element: <ProtectedRouting><ProductDetails/></ProtectedRouting> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'logout', element: <Logout /> },
      ],
    },
  ]);

  return (
    <>
<CartContextProvider>
<CartContextProvider>
    <QueryClientProvider client={Query}>
    <UserContextProvider>
      <RouterProvider router={x}></RouterProvider>
      <ToastContainer />
      <ReactQueryDevtools/>
    </UserContextProvider>
    </QueryClientProvider>
    </CartContextProvider>

</CartContextProvider>

    </>
  );
}

export default App;