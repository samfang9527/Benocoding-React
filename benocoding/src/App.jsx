
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import Header from "./components/header";
import Footer from "./components/footer";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    background-color: #434343ff;
    color: white;
    font-family: 'Livvic';
    font-size: 16px;
  }
`;

function App() {
    return (
      <>
        <GlobalStyle />
            <Header />
            <Outlet />
            <Footer />
      </>
    );
  }
  
  export default App;