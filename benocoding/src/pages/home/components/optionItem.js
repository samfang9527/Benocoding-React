
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from {
        opacity: 0;
        margin-top: -15px;
    }
    30% {
        opacity: 0.5;
        margin-top: -8px
    }
    70% {
        opacity: 0.7;
        margin-top: -2px
    }
    to {
        opacity: 1;
        margin-top: 0
    }
`;

const OptionButton = styled.button`
    width: 100%;
    height: 40px;
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
    animation: ${fadeIn} .2s ease-in-out;
`;

const OptionItem = ({option}) => {

    return (
        <OptionButton>
            {option}
        </OptionButton>
    )
}

export default OptionItem;