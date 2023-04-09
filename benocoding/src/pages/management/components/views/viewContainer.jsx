
import styled from "styled-components";
import ViewSwitcher from "./viewSwitcher";

const OptionViewContainer = styled.div`
    height: 80%;
    width: 80%;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
    overflow: scroll;
    display: grid;
    align-content: flex-start;
`;

const Heading = styled.h2`
    height: 60px;
    position: sticky;
    top: 10px;
    background-color: rgba(10, 170, 120, 95%);
    margin: 10px;
    padding: 15px 0;
    border-radius: 10px;
`;

const ViewContainer = ({viewData, clickedOption}) => {
    return (
        <OptionViewContainer>
            <Heading>詳細資訊</Heading>
            <ViewSwitcher viewData={viewData} clickedOption={clickedOption}/>
        </OptionViewContainer>
    )
}

export default ViewContainer;