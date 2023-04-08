
import styled from "styled-components";
import { fetchOptionData } from "../../../../utils/apis/class.js";
import { UserContext } from "../../index.jsx";
import { useContext } from "react";

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
    font-size: 20px;
    font-weight: 550;
    letter-spacing: 2px;
    cursor: pointer;
    &:hover {
        background-color: green;
    }
`;

const ClassItem = ({className, classId, chooseClass, setViewData}) => {

    const userData = useContext(UserContext);

    function showOptions() {
        fetchOptionData(chooseClass, userData.userId, classId, setViewData)
    }

    return (
        <ClassButton onClick={showOptions}>
            {className}
        </ClassButton>
    )
}

export default ClassItem;