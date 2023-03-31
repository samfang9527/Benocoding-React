
import styled from "styled-components";

const OptionViewContainer = styled.div`
    height: 80%;
    width: 70%;
    text-align: center;
    padding: 0 10px;
    border: 1px solid white;
    border-radius: 10px;
    margin: 0 10px;
`;

const OptionView = ({viewData}) => {
    return (
        <OptionViewContainer>
            <h2>詳細資訊</h2>
        </OptionViewContainer>
    )
}

export default OptionView;