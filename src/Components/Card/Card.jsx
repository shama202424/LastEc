
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";



export default function Card() {
let { getCartItem, removeCartProduct, updateCartProduct } = useContext(CartContext);
console.log(updateCartProduct);
let [cartData,setCartData] = useState(null)

async function getCartData()
  {
    let response = await getCartItem()
    console.log(response);
    setCartData(response.data)
  }

async function deleteCartItem(id)
  {
    let response = await removeCartProduct(id)
    console.log(id);
    
    console.log(response);
    setCartData(response.data)
    if(response.data.status=='success')
    {
      toast.error('Product Remove Successfully')
    }
    else{
      toast.success('Error')
    }
  }
  async function updateCartData(id, count) {
    if (count == 0)
    {
      removeCartProduct(id)
    }
    else if (count < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
  
    try {
      let response = await updateCartProduct(id, count);
      
  
      if (response.data.status === 'success') {
        setCartData(response.data);
        toast.success("Quantity updated successfully");
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("An error occurred while updating quantity");
    }
  }

  
useEffect(()=>
{
  getCartData()
},[])
 
    return (
      <>
     

<div className="w-3/4 mx-auto overflow-x-auto shadow-md sm:rounded-lg pt-36 bg-slate-400">
<Link to={'/CheckOut'}>
<button className="mb-7 bg-blue-600">check out</button>
</Link>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {cartData?.data?.products?.map((product)=><tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="iPhone 12" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={() => updateCartData(product.product.id, product.count - 1)} className="bg-red-600 inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div className="ms-3">
<span>{product.count}</span>            </div>
            <button onClick={() => updateCartData(product.product.id, product.count + 1)} className="bg-black inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <span>{product.price + ' EGP'}</span>
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteCartItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>)}

    </tbody>
  </table>
</div>


      </>
    );
  }
  
