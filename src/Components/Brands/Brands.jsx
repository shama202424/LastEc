import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState('');


  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }


  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });


  if (isLoading) {
    return <span className="loader flex justify-center m-auto"></span>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="brands-container max-w-screen-xl mx-auto">
      <h2 className="text-center mb-4 text-2xl">Brands</h2>


      <div className="grid grid-cols-3 gap-4">
        {data.data.data.map((brand) => (
          <div
            key={brand.id}
            className="brand-box bg-gray-200 p-6 rounded-lg text-center cursor-pointer hover:bg-blue-600 hover:text-white transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>

            <img
              src={brand.image || 'default-image-url'}
              alt={brand.name}
              className="w-full h-40 object-contain mb-4 rounded-lg"
            />
            <button
              onClick={() => setSelectedBrand(brand.name)}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            >
              Select
            </button>
          </div>
        ))}
      </div>


      {selectedBrand && (
        <div className="mt-4 text-center">
          <h3 className="text-2xl">You selected: {selectedBrand}</h3>
        </div>
      )}
    </div>
  );
}
