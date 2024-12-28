// context عشان اشير بيها الداتا للكل
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider(props) {
// هنا عملناها عشان لو حصل رفرش للموقع يفضل مسجل
    useEffect(
        ()=>{
            
            if(localStorage.getItem('userToken')!==null)
            {
              setUserLogin(localStorage.getItem('userToken'))
            }
        },[]
    )


  const [userLogin, setUserLogin] = useState(null);

  return (
    <userContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </userContext.Provider>
  );
}
