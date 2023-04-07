
import styled from "styled-components";

const MessageBlock = styled.div`
    font-size: 18px;
    text-align: left;
    letter-spacing: 2px;
    padding: 0 0 15px 40px;
`;

const Message = styled.p`
    margin: 0;
    height: 20px;
`;

const ViewChatroomMessageItem = ({msg}) => {

    const msgArray = msg.split('\n');

    return (
        <>
            <MessageBlock>
                {
                    msgArray.map((text, idx) => {
                        return <Message key={idx}>{text}</Message>
                    })
                }
            </MessageBlock>
        </>
    )
}

export default ViewChatroomMessageItem;