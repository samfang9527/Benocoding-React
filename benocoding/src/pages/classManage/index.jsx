
import styled from "styled-components";
import { useEffect } from "react";

const SideNavBlock = styled.nav`
    width: 100px;
    position: relative;
    top: 50px;
    border: 1px solid black;
`

const ViewWrapper = styled.div`
    height: 100vh;
    position: relative;
    left: 130px;
    border: 1px solid black;
`

const ClassManage = () => {

    useEffect(() => {

    }, [])

    return (
        <main>
            <SideNavBlock></SideNavBlock>
            <ViewWrapper></ViewWrapper>
        </main>  
    )
}

export default ClassManage;

