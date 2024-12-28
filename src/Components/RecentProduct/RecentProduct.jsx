import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RecentProduct() {
  const { addToCart, addToWishList } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);

  async function addProduct(proId) {
    let flag = await addToCart(proId);
    if (flag) {
      toast.success('Product added successfully to your cart');
    } else {
      toast.error('Failed to add product to the cart');
    }
  }

  function getData() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getData,
  });

  if (isLoading) {
    return <span className="loader flex justify-center m-auto"></span>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const filteredProducts = data.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function handleLike(product) {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);

    if (isAlreadyInWishlist) {
      toast.error("Product is already in your wishlist");
    } else {
      try {
        await addToWishList(product); 
        setWishlist((prevWishlist) => [...prevWishlist, product]);
        toast.success("Product added to your wishlist");
      } catch (error) {
        toast.error("Failed to add product to wishlist");
      }
    }
  }

  return (
    <>
      <form className="max-w-[70%] mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>

      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="w-1/4 p-4 my-4 bg-gray-200">
            <Link to={`ProductDetails/${product.id}/${product.category.name}`}>
              <div className="product">
                <img className="w-full" src={product.imageCover} alt="" />
                <h3 className="text-green-600 text-start">{product.category.name}</h3>
                <h4 className="text-start">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h4>
                <div className="rate flex justify-between">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage} <i className="fa fa-star text-yellow-500"></i>
                  </span>
                </div>
              </div>
            </Link>

            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => addProduct(product.id)}
                className="bg-green-500 my-2 px-4 py-2 text-white rounded-md"
              >
                Add To Cart
              </button>
              <i
                onClick={() => handleLike(product)} 
                className={`text-3xl cursor-pointer fa-solid fa-heart ${
                  wishlist.some((item) => item.id === product.id) ? 'text-red-500' : 'text-gray-500'
                }`}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
