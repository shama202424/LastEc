

import Navbar from '../Navbar/Navbar';
import {Outlet} from 'react-router-dom';


export default function Layout() {
  return ( 
    <div>
      <Navbar/>
      <div className='container p-15 text-center'>
      <Outlet></Outlet>
      </div>


    </div>
  )
}
