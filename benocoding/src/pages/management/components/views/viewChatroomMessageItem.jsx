
import styled from "styled-components";
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';

const MessageBlock = styled.div`
    font-size: 18px;
    text-align: left;
    letter-spacing: 2px;
    padding: 0 0 15px 0;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const MessageItem = styled.div`
    height: 60px;
    width: 100%;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Username = styled.p`
    font-size: 24px;
    font-wieght: bold;
    margin: 5px 0;
    display: inline-block;
`;

const Time = styled.p`
    font-size: 14px;
    display: inline;
    margin-left: 10px;
`;

const Message = styled.p`
    margin: 0;
    height: 20px;
`;

const ViewChatroomMessageItem = ({msg}) => {
    const text = msg.message;
    const msgArray = text.split('\n');

    return (
        <>
            <MessageBlock>
                {
                    msgArray.map((text, idx) => {
                        return (
                            <Wrapper>
                                <AccessibleForwardIcon sx={{
                                    height: "40px",
                                    width: "40px"
                                }}/>
                                <MessageItem>
                                    <Username>
                                        {msg.from}
                                        <Time>({msg.time})</Time>
                                    </Username>
                                    <Message key={idx}>{text}</Message>
                                </MessageItem>
                            </Wrapper>
                        )
                    })
                }
            </MessageBlock>
        </>
    )
}

export default ViewChatroomMessageItem;