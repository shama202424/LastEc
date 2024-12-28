import axios from "axios";
import { createContext } from "react";

export let wishlistContext =createContext
export default function WishlistContextProvider(props)
{
    let headers = {
        token: localStorage.getItem("userToken"),
      };
function addToWishList(productId)

axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    productId
},{headers})      .then((response) => {
    setCartID(response.data.cartId);
    return response;
  })
  .catch((error) => {
    console.error("Error in addToCart:", error.response?.data || error.message);
    throw error;
  });


    return <WishlistContext.Provider value={{addToWishList}}>
{props.children}
    </WishlistContext.Provider>
}