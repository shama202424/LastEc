import { Navigate } from "react-router-dom"


export default function ProtectedRouting(props) {

if(localStorage.getItem('userToken')!==null){
  return props.children
}
else
{
  <Navigate to={'/login'}/>
}


  return (
    <div>ProtectedRouting</div>
  )
}
