
import styled from "styled-components";
import { useState, useEffect } from "react";
import ClassContainer from "./classContainer";

const MainWrapper = styled.div`
    height: 80vh;
`;

const Main = () => {
    return (
        <MainWrapper>
            <ClassContainer />
        </MainWrapper>
    )
}

export default Main;