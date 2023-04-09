
import styled from "styled-components";
import { fetchOptionData } from "../../../../utils/apis/class.js";

const ClassButton = styled.button`
    width: 90%;
    height: 50px;
    border: none;
    background-color: #4CAF50;
    color: white;
    border-radius: 6px;
    display: block;
    margin: 10px 0;
    position: relative;
    font-size: 18px;
    font-weight: 550;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
        background-color: green;
    }
`;

const ClassItem = ({data, chooseClass, setViewData}) => {

    function showOptions() {
        fetchOptionData(chooseClass, data.role, data.classId, setViewData)
    }

    return (
        <ClassButton onClick={showOptions}>
            {data.className}
        </ClassButton>
    )
}

export default ClassItem;