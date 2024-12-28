import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as Yup from 'yup';


export default function Login() {

  let navigate = useNavigate()
  const [apiError, setapiError] = useState('')
  const [loading, setloading] = useState(false)
  //yup validtion
  
  let validationSchema = Yup.object().shape({
    email:Yup.string().email('Email is invalid').required("Email is Required"),
    password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  
  })

  async function handelLogin(values) {


    setloading(true)
    console.log(values);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
  
    .then(
      (apiResp)=>
      {
        
        localStorage.setItem('userToken',apiResp.data.token)
        setloading(false)
  
        navigate('/')
      }
    )
    .catch(
      (apiResp)=>
      {
        setloading(false)
        setapiError(apiResp.response.data.message)
        console.log(apiResp.response.data.message);
        
      }
    )
  
  
  
  }
  
  
  
  
  
  
  
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:'',
    },
    onSubmit:handelLogin,
    validationSchema:validationSchema
  
  })
  
    return (
      <div>
  
  
  <form className="max-w-sm mx-auto lg:pt-20" onSubmit={formik.handleSubmit}>
  
  {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{apiError}</span>
  </div>:null}
  
    <div className="mb-5">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
      <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com"/>
    
      {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{formik.errors.email}</span>
  </div>:null}
  
    </div>
  
    <div className="mb-5">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
      <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    
      {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <span className="font-medium">{formik.errors.password}</span>
  </div>:null}
  
    </div>

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {loading?<i className='fas fa-spinner fa-spin px-2'></i>:'Submit'}
      </button>

      <p className='pt-3'>Creat New Account <Link to={'/Register'}>Register Now</Link></p>
  </form>
  
      </div>
    )
  }
  