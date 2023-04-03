
import { createGlobalStyle } from "styled-components";
import Header from "./components/header";
import Footer from "./components/footer";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
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