
import Main from "./components/main";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { BACKEND_API_URL } from "../../global/constant.js";

export const UserContext = createContext(null);

const Management = () => {

    const [userInfo, setUserInfo] = useState({});

    async function jwtValidation(jwt) { 
      try {
        const data = await axios({
          url: BACKEND_API_URL,
          headers: {
            "Content-Type": "application/json",
            "token": jwt
          },
          method: "POST",
          data: {
            query: `
              query {
                jwtValidate {
                  userId,
                  username
                }
              }
            `
          }
        })
        return data;
      } catch (err) {
        console.error(err);
      }
    }

    useEffect(() => {
      const jwt = window.localStorage.getItem('jwt');
      if ( !jwt ) {
        alert('Please sign in to continue');
        window.location.assign('/login');
      }

      (async () => {
        try {
          const result = await jwtValidation(jwt);
          if ( !result ) {
            alert('Authorization failed, please sign in again');
            window.location.assign('/login');
          } else {
            setUserInfo(result.data.data.jwtValidate);
          }
        } catch (err) {
          console.error(err);
        }
      })();

    }, []);

    return (
      <UserContext.Provider value={userInfo}>
        <Main />
      </UserContext.Provider>
    )
    
}

export default Management;