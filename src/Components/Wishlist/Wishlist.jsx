import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(CartContext);

  if (!wishlist || wishlist.length === 0) {
    return <h2 className="text-center mt-10 text-gray-500">Your wishlist is empty.</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-8">My Wishlist</h2>

      <div className="grid grid-cols-2 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg shadow-lg overflow-hidden p-4"
          >
            <Link to={`ProductDetails/${product.id}/${product.category.name}`}>
              <img
                className="w-full h-40 object-cover mb-4"
                src={product.imageCover}
                alt={product.title}
              />
              <h3 className="text-lg font-semibold text-green-600 mb-2">
                {product.title}
              </h3>
              <p className="text-gray-700 mb-2">{product.category.name}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">{product.price} EGP</span>
                <span>
                  {product.ratingsAverage} <i className="fa fa-star text-yellow-500"></i>
                </span>
              </div>
            </Link>

            <button
              onClick={() => removeFromWishlist(product.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Remove from Wishlist
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
}
