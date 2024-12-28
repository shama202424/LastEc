import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick"; 

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
  autoplay:true,
  autoplayspeed: 1000,
  }

  const [categories, setCategories] = useState([]);

  function getProductRelatedPro() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  useEffect(() => {
    getProductRelatedPro();
  }, []);

  return (
    <>
     <Slider className="my-3 py-4" {...settings}>

    {categories?.map((product)=>
    <>
          <img className="product-image" src={product?.image} alt={product.name} />
          <h3>{product?.name}</h3>
    </>
)}

    </Slider>


    </>
  );
}
{/*categories.length > 0 &&
  categories.map((category) => (
    <div key={category.id}>
      <img src={category.image} alt={category.name} />
    </div>
  ))*/}