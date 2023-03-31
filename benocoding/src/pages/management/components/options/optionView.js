
import styled from "styled-components";
import OptionDetails from "./optionDetails";

const OptionViewContainer = styled.div`
    height: 80%;
    width: 70%;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
`;

const OptionView = ({viewData, clickedOption}) => {
    return (
        <OptionViewContainer>
            <h2>詳細資訊</h2>
            <OptionDetails viewData={viewData} clickedOption={clickedOption}/>
        </OptionViewContainer>
    )
}

export default OptionView;