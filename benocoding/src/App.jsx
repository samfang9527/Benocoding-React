
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from "styled-components";
import Header from "./components/header";
import Footer from "./components/footer";
import { AuthContextProvider } from './global/authContext';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    background-color: white;
    margin: 0;
    color: black;
    font-family: 'Livvic';
    font-size: 16px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
`;

function App() {
  return (
    <PageContainer>
      <GlobalStyle />
      <AuthContextProvider>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer />
      </AuthContextProvider>
    </PageContainer>
  );
}
  
  export default App;