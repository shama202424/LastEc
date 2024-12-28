import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
//import { useEffect, useState } from 'react';

export default function useProducts() {

    function getData()
    {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let apiResponse = useQuery({
      queryKey:['recentProduct'],
      queryFn:getData,
    
      //refetchInterval:1000
    }
)

return apiResponse

}
