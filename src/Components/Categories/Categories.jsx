import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }


  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });


  if (isLoading) {
    return <span className="loader flex justify-center m-auto"></span>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="categories-container max-w-screen-xl mx-auto">
      <h2 className="text-center mb-4 text-2xl">Categories</h2>


      <div className="grid grid-cols-3 gap-4">
        {data.data.data.map((category) => (
          <div
            key={category.id}
            className="category-box bg-gray-200 p-6 rounded-lg text-center cursor-pointer hover:bg-green-600 hover:text-white transition-all"
          >
            <h3 className="text-xl font-semibold mb-2">{category.name}</h3>

            <img
              src={category.image || 'default-image-url'}
              alt={category.name}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <button
              onClick={() => setSelectedCategory(category.name)}
              className="bg-green-500 text-white py-2 px-4 rounded mt-2"
            >
              Select
            </button>
          </div>
        ))}
      </div>


      {selectedCategory && (
        <div className="mt-4 text-center">
          <h3 className="text-2xl">You selected: {selectedCategory}</h3>
        </div>
      )}
    </div>
  );
}
