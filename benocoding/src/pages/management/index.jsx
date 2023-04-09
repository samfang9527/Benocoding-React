
import Main from "./components/main";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "../../global/authContext";

export const UserContext = createContext(null);

const Management = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {
      if ( !authContext.isLoading ) {
        if ( !authContext.isLogin ) {
          alert('Please sign in to continue');
          window.location.assign('/login');
        }
      }
    }, [authContext]);

    return (
      <Main />
    )
    
}

export default Management;