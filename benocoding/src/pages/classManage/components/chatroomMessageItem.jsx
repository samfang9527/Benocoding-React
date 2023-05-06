
import styled from "styled-components";
import { AuthContext } from "../../../global/authContext";
import { useContext } from "react";

const MessageBlock = styled.div`
    font-size: 18px;
    letter-spacing: 2px;
    margin: 0 10px 0 0;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
`;

const MessageItem = styled.div`
    width: 100%;
    margin: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Username = styled.div`
    font-size: 20px;
    font-wieght: bold;
    padding: 12.5px;
    border-radius: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px solid black;
    text-align: center;
    background-color: AliceBlue;
`;

const SingleMessageContainer = styled.div`
    margin: 5px 0;
    display: flex;
    align-items: flex-start;
    justify-content: ${props => props.isOwn ? "flex-end" : "flex-start"};
`;

const UserNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px 10px;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    max-width: 30%;
    min-width: 10%;
    padding: 5px 10px;
    border-radius: ${props => props.isOwn ? "10px 0 10px 10px" : "0 10px 10px 10px"};
    background-color: Ivory;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
`;

const Message = styled.div`
    font-size: 24px;
    margin-bottom: 10px;
    white-space: pre-line;
`;

const MessageUsername = styled.div`
    font-size: 16px;
`;


const ChatroomMessageItem = ({msg, teacherId}) => {
    const text = msg.message;

    const authContext = useContext(AuthContext);
    const { userId } = authContext.user;

    return (
        <>
            <MessageBlock>
                <Wrapper isOwn={userId === msg.userId}>
                    <MessageItem>
                        {
                            userId === msg.userId ? 
                                <SingleMessageContainer isOwn={userId === msg.userId}>
                                    <MessageContainer isOwn={userId === msg.userId}>
                                        <MessageUsername>{msg.from} <span>({teacherId === msg.userId ? "teacher" : "student"})</span></MessageUsername>
                                        <hr style={{width: "100%", margin: "3px 0"}}/>
                                        <Message>{text}</Message>
                                    </MessageContainer>
                                    <UserNameContainer>
                                        <Username>{msg.from.slice(0, 1)}</Username>
                                    </UserNameContainer>
                                </SingleMessageContainer>
                                : 
                                <SingleMessageContainer isOwn={userId === msg.userId}>
                                    <UserNameContainer>
                                        <Username>{msg.from.slice(0, 1)}</Username>
                                    </UserNameContainer>
                                    <MessageContainer isOwn={userId === msg.userId}>
                                        <MessageUsername>{msg.from} <span>({teacherId === msg.userId ? "teacher" : "student"})</span></MessageUsername>
                                        <hr style={{width: "100%", margin: "3px 0"}}/>
                                        <Message>{text}</Message>
                                    </MessageContainer>
                                </SingleMessageContainer>
                        }
                    </MessageItem>
                </Wrapper>
            </MessageBlock>
        </>
    )
}

export default ChatroomMessageItem;