import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick";

export default function ProductDetails() {
 let {id ,category} =useParams()

 var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,

};

const [productsDetails, setProductsDetails] = useState([]);
const [relatedProductsDetails, setrelatedProductsDetails] = useState([]);

function getProductDetails(id) {
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((response) => {
      console.log(response.data);
      setProductsDetails(response.data.data || []);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

function getRelatedProduct(category) {
  axios
    .get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((response) => {
      console.log(response.data);
      let getAllProduct = response.data.data || [];
      let relatedPro = getAllProduct.filter((product) => product.category.name === category);
      console.log(relatedPro);

      setrelatedProductsDetails(relatedPro);
    })
    .catch((error) => {
      console.error("Error fetching related products:", error);
    });
}


useEffect(() => {
  getProductDetails(id);
  getRelatedProduct(category)
}, [id,category]); 

  return (
    <>
    <div className="row pt-14">

<div className="flex items-center p-5 w-full bg-red-300">
<div className="w-1/4">

<Slider {...settings}>

        {productsDetails?.images?.map((src)=><img className="w-full" src={src} alt="" />)}
      

    </Slider>

      </div>
      <div className="w-3/4">
      <h3 className="text-green-500">{productsDetails?.category?.name || "No category name available"}</h3>
      <h2>{productsDetails.title}</h2>
      <h2>{productsDetails.description}</h2>
      <div className="rate flex justify-center line-clamp-4">
    
                <span className="px-5">{productsDetails.price} EGP</span>
                <span>{productsDetails.ratingsAverage} <i className='fa fa-star text-yellow-500'></i></span>
              </div>
              <button className='bg-green-500 my-2'>Add To Card</button>
      </div>
</div>
      
    </div>

    <div className="row">
        {relatedProductsDetails.map((product, index) => (
          <div key={index} className="w-1/6 p-4 my-4 bg-gray-200">
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
            <div className="product">
              <h3 className='text-green-600'>{product.category.name}</h3>
              <h4>{product.title.split(' ').slice(0,2).join(' ')}</h4>
              <img className='w-full' src={product.imageCover} alt="" />
            </div>
            </Link>

          </div>
        ))}
      </div>
    </>
  )
}
