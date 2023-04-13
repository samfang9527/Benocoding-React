
import styled from "styled-components";
import { useState } from "react";
import { BACKEND_DOMAIN } from "../../../global/constant.js";
import axios from "axios";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Block = styled.div`
    height: 50px;
    width: 95%;
    border: 1px solid black;
    margin: 10px 0 0 0;
    cursor: pointer;
    
    :hover {
        background-color: bisque;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

const ContentWrapper = styled.div`
    border: 1px solid black;
    height: ${props => props.isShowContent ? '400px' : '0'};
    transition: height 0.3s ease-in-out;
`;

const ContentContainer = styled.p`
    font-size: 20px;
`;

const ContentTitle = styled.p`
    font-size: 20px;
    padding: 0 20px;
`;


const MilestoneItem = ({milestone, idx}) => {

    const [ isShowContent, setIsShowContent ] = useState(false);

    function showContent(e) {
        e.preventDefault();
        setIsShowContent(!isShowContent);
    }

    return (
        <>
            <Block onClick={showContent}>
                <TitleWrapper>
                    <MenuOpenIcon sx={{fontSize: "50px", cursor: "pointer"}}></MenuOpenIcon>
                    <ContentTitle>{milestone.milestone}</ContentTitle>
                </TitleWrapper>
            </Block>
            <ContentWrapper isShowContent={isShowContent}>
                {
                    isShowContent ? <ContentContainer>

                    </ContentContainer> : ''
                }
            </ContentWrapper>
        </>
    )
}

export default MilestoneItem;
