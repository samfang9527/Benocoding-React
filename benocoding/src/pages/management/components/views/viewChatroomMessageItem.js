
import styled from "styled-components";

const MessageBlock = styled.div`
    font-size: 18px;
    text-align: left;
    letter-spacing: 2px;
    padding: 0 0 15px 40px;
`;

const SplitLine = styled.hr`
    width: 95%;
    border: 1px solid gray;
    margin-bottom: 15px;
`;

const ViewChatroomMessageItem = ({msg}) => {

    return (
        <>
            <MessageBlock>{msg}</MessageBlock>
        </>
    )
}

export default ViewChatroomMessageItem;