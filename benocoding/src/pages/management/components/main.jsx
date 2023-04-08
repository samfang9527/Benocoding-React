
import styled from "styled-components";
import MainContainer from "./mainContainer";

const MainWrapper = styled.div`
    height: 80vh;
`;

const Main = () => {
    return (
        <MainWrapper>
            <MainContainer />
        </MainWrapper>
    )
}

export default Main;