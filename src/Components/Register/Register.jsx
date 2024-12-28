import { useFormik } from 'formik';
import axios from 'axios';
import { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup'
import { userContext } from '../../Context/UserContext';


export default function Register() {
// بتشك بيها علي اليوزر 
  let { setUserLogin } = useContext(userContext);


// النفجيت دي عشان لما احب ارجع للصفحه الرئيسيه
let navigate = useNavigate()
// للايرور
const [apiError, setapiError] = useState('')
// للودينج
const [loading, setloading] = useState(false)
//yup validtion افضل من التقليدي

let validationSchema = Yup.object().shape({
  name:Yup.string().min(3,'name minlength 3').max(10,'name maxlenth 10').required('name is required'),
  email:Yup.string().email('Email is invalid').required("Email is Required"),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/, 'phone is invalid'),
  password: Yup.string().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref('password')], 'Repassword must match the password'),


})

// validtion تقليدي

/*function validation(validForm)
{
let errors = {}

if(!validForm.name)
{
  errors.name='Name is Required'
}
else if (!/^[A-Z][a-z]{3,6}$/.test(validForm.name))
{
  errors.name='Name Must start With capital'
}
if(!validForm.email)
  {
    errors.email='Email is Required'
  }
else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(validForm.email))
{
   errors.email='Email is invalid'
}
if(!validForm.phone)
  {
    errors.phone='Phone is Required'
  }

return errors
}
*/





// دي عشان نهندل التسجيل
async function handelRegister(values) {


  setloading(true)
  console.log(values);
  // call api
  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
// لو الداتا صح بيدخل في ال then
  .then(
    (apiResp)=>
    {
      // بخزن التوكن في اللوكل استورج
      localStorage.setItem('userToken',apiResp.data.token)
      setUserLogin(apiResp.data.token)
      setloading(false)
      // بتوجهنا للصفحه الرئيسيه
      navigate('/')
    }
  )
  // لو غلط هيدخل في ال catch
  .catch(
    (apiResp)=>
    {
      //بتاعت الريلود
      setloading(false)
      //بنعرض الايرور من الكونسول
      setapiError(apiResp.response.data.message)

      
    }
  )


}







// check علي الداتا ونركز فيها 
let formik = useFormik({
  initialValues:{
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:'',
  },
  onSubmit:handelRegister,
  validationSchema:validationSchema

})

  return (
    <div>


<form className="max-w-sm mx-auto lg:pt-20" onSubmit={formik.handleSubmit}>

{apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
<span className="font-medium">{apiError}</span>
</div>:null}

  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

{formik.errors.name && formik.touched.name?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.name}</span>
</div>:null}


  </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com"/>
  
    {formik.errors.email && formik.touched.email?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.email}</span>
</div>:null}

  </div>

  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
    <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  
    {formik.errors.phone && formik.touched.phone?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.phone}</span>
</div>:null}

  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
    <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  
    {formik.errors.password && formik.touched.password?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.password}</span>
</div>:null}

  </div>
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repassword</label>
    <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
  
    {formik.errors.rePassword && formik.touched.rePassword?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{formik.errors.rePassword}</span>
</div>:null}

  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {loading?<i className='fas fa-spinner fa-spin px-2'></i>:'Submit'}
    </button>
</form>

    </div>
  )
}
