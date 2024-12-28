import axios from "axios";
import { createContext, useState, useEffect } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [cartID, setCartID] = useState(null); // استخدام useState لتخزين معرف السلة
  const [wishlist, setWishlist] = useState([]); // حالة لتخزين قائمة الأمنيات

  const headers = {
    token: localStorage.getItem("userToken"),
  };

  // عند تحميل الصفحة، استرجاع قائمة الأمنيات من localStorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // إضافة المنتج إلى السلة
  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }
      )
      .then((response) => {
        setCartID(response.data.cartId); // تحديث cartID
        return response;
      })
      .catch((error) => {
        console.error("Error in addToCart:", error.response?.data || error.message);
        throw error;
      });
  }

  // إضافة المنتج إلى قائمة الأمنيات
  function addToWishList(product) {
    // تحقق إذا كان المنتج موجودًا مسبقًا في قائمة الأمنيات
    const isProductInWishlist = wishlist.some((item) => item.id === product.id);
    if (isProductInWishlist) {
      console.log("Product already in wishlist");
      return false; // منتج موجود مسبقًا
    }

    // إضافة المنتج إلى قائمة الأمنيات وتخزينها في localStorage
    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // حفظ في localStorage
    console.log("Product added to wishlist", product);
    return true; // المنتج أضيف بنجاح
  }

  // إزالة المنتج من قائمة الأمنيات
  function removeFromWishlist(productId) {
    const updatedWishlist = wishlist.filter((product) => product.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // حفظ في localStorage بعد الحذف
  }

  // بقية الوظائف للسلة
  function getCartItem() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setCartID(response.data.cartId); // تحديث cartID عند جلب بيانات السلة
        return response;
      })
      .catch((error) => {
        console.error("Error in getCartItem:", error.response?.data || error.message);
        throw error;
      });
  }

  function removeCartProduct(proId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${proId}`, { headers })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error in removeCartProduct:", error.response?.data || error.message);
        throw error;
      });
  }

  function updateCartProduct(proId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${proId}`,
        { count },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error in updateCartProduct:", error.response?.data || error.message);
        throw error;
      });
  }

  function checkOut(cartID, url, formValues) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,
        { shippingAddress: formValues },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error("Error in checkOut:", error.response?.data || error.message);
        throw error;
      });
  }

  return (
    <CartContext.Provider
      value={{
        checkOut,
        addToCart,
        cartID,
        getCartItem,
        removeCartProduct,
        updateCartProduct,
        addToWishList,
        removeFromWishlist,
        wishlist,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
