import { Link } from "react-router-dom";
import useProducts from "../Hooks/useProducts"


export default function About() {


let {data , isError , isLoading , error} = useProducts()


return (
  <>
    <div className="row pt-20">
      {data.data.data.map((product, index) => (
        <div key={index} className="w-1/6 p-4 my-4 bg-gray-200">
          <Link to={`ProductDetails/${product.id}/${product.category.name}`}>
          <div className="product">
            <h3 className='text-green-600'>{product.category.name}</h3>
            <h4>{product.title.split(' ').slice(0,2).join(' ')}</h4>
            <img className='w-full' src={product.imageCover} alt="" />
            <div className="rate flex justify-between">
              <span>{product.price} EGP</span>
              <span>{product.ratingsAverage} <i className='fa fa-star text-yellow-500'></i></span>
            </div>
            
          </div>
          </Link>
          <button className='bg-green-500 my-2'>Add To Card</button>
        </div>
      ))}
    </div>
  </>
);
}
