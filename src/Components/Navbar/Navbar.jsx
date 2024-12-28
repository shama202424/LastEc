
import { useContext } from 'react';
import logo from '../../assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';



export default function Navbar() {

  let { userLogin, setUserLogin } = useContext(userContext);

let navigate = useNavigate()

function logout()
{

  localStorage.removeItem('userToken')
  setUserLogin(null)
  navigate('/login')
}



  return (
<nav className='bg-gray-600 p-2 h-16 lg:fixed z-30 static top-0 left-0 right-0 flex flex-col lg:flex-row justify-between items-center px-4 lg:px-10'>
  <div className="flex items-center">
    <img src={logo} width={80} alt="FreshCart Logo" />
  </div>

  <ul className='flex flex-col lg:flex-row justify-center items-center flex-grow'>
    <li className='mx-3'>
      <NavLink to={""}>Home</NavLink>
    </li>
    <li className='mx-3'>
      <NavLink to={"card"}>Card</NavLink>
    </li>
    <li className='mx-3'>
      <NavLink to={"wishlist"}>Wish list</NavLink>
    </li>
    <li className='mx-3'>
      <NavLink to={"products"}>Products</NavLink>
    </li>
    <li className='mx-3'>
      <NavLink to={"categories"}>Categories</NavLink>
    </li>
    <li className='mx-3'>
      <NavLink to={"brands"}>Brands</NavLink>
    </li>
  </ul>

  <ul className='flex flex-col lg:flex-row items-center'>
    <li className='text-2xl mx-3'>
      <i className="fa-solid fa-cart-shopping"></i>
    </li>
    {userLogin == null ? (
      <>
        <li className='mx-3'>
          <NavLink to={"login"}>Login</NavLink>
        </li>
        <li className='mx-3'>
          <NavLink to={"register"}>Register</NavLink>
        </li>
      </>
    ) : (
      <li onClick={logout} className='mx-3 cursor-pointer text-red-600'>
        Logout
      </li>
    )}
  </ul>
</nav>


  )
}
