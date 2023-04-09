import {
    createContext,
    useState,
    useEffect,
} from 'react';
import axios from "axios";
import { BACKEND_API_URL } from './constant.js';

  
export const AuthContext = createContext({
    isLoading: true,
    isLogin: false,
    user: {},
    jwtToken: '',
    login: () => {}
});

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoding] = useState(true);
    const [jwtToken, setJwtToken] = useState();

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
                    username,
                    email
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

    const login = (jwt) => {
        setJwtToken(jwt);
        setIsLogin(true);
        setIsLoding(false);
    }
  
    useEffect(() => {
        const jwt = window.localStorage.getItem('jwt');
        if ( !jwt ) {
            return;
        }

        (async () => {
            try {
                const result = await jwtValidation(jwt);
                if ( !result ) {
                    alert('Authorization failed, please sign in again');
                    window.location.assign('/login');
                } else {
                    setJwtToken(jwt);
                    setUser(result.data.data.jwtValidate);
                    setIsLogin(true);
                    setIsLoding(false);
                }
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);
    
    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isLogin,
                user,
                jwtToken,
                login
            }}
        >{children}
        </AuthContext.Provider>
    );
}