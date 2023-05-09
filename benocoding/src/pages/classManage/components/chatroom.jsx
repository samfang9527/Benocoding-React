
import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect, useRef, useContext } from "react";
import ChatroomMessageItem from "./chatroomMessageItem";
import ChatroomInput from "./chatroomInput";
import { PRODUCTION_BACKEND_API_URL } from "../../../global/constant.js";
import { AuthContext } from "../../../global/authContext";
import {
    subscribeChatroom,
    unSubscribeChatroom,
    listenNewMessage,
    updateChatroomConnectTime
} from "../../../utils/socket/socket.js";
import { Fragment } from "react";


const Container = styled.div`
    height: 85vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: scroll;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const NoMessageInfo = styled.div`
    width: 100%;
    text-align: center;
    position: relative;
    align-self: center;
    top: 30%;
    left: 0;
    font-size: 40px;
    letter-spacing: 2px;
    line-height: 2;
`;

const StyledHr = styled.hr`
    width: 100%;
    line-height: 1em;
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    height: 1.5em;
    opacity: .7;
    &:before {
        content: '';
        background: linear-gradient(to right, transparent, #818078, transparent);
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
    }
    &:after {
        content: "${props => props.text}";
        position: relative;
        display: inline-block;
        color: black;
        padding: 0 .5em;
        line-height: 1.5em;
        background-color: #fcfcfa;
    }
`;

async function fetchChatroomMsgs(chatroomId) {

    const { data } = await axios({
        url: PRODUCTION_BACKEND_API_URL,
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: {
            query: `
                query($chatroomId: String!) {
                    getMessages(chatroomId: $chatroomId) {
                        response {
                            statusCode,
                            responseMessage
                        },
                        messages {
                            time,
                            from,
                            message,
                            userId
                        }
                    }
                }
            `,
            variables: {
                chatroomId: chatroomId
            }
        }
    })
    return data.data;
}

async function fetchLastConnectTime(userId) {
    const { data } = await axios({
        url: PRODUCTION_BACKEND_API_URL,
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "token": window.localStorage.getItem("jwt")
        },
        data: {
            query: `
                query($meId: String!) {
                    me(id: $meId) {
                        lastChatroomConnectTime,
                        statusCode,
                        responseMessage
                    }
                }
            `,
            variables: {
                meId: userId
            }
        }
    })
    return data.data.me;
}


const Chatroom = ({classData}) => {

    const bottomRef = useRef(null);
    const [ messages, setMessages ] = useState([]);
    const [ lastConnectTime, setLastConnectTime ] = useState(new Date());
    const authContext = useContext(AuthContext);

    const { chatroomId, ownerId } = classData;
    const { userId } = authContext.user;
    let firstUnseen = true;
    
    useEffect(() => {
        
        // update messages from DB
        fetchChatroomMsgs(chatroomId)
            .then(res => {
                const { response } = res.getMessages;
                if ( response && response.statusCode === 200 ) {
                    const { messages } = res.getMessages;
                    setMessages(messages);
                }
            })
            .catch(err => {console.error(err)})

    }, [ chatroomId ])

    useEffect(() => {
        subscribeChatroom(chatroomId);    

        function onUpdateEvent(msgData) {
            setMessages(prev => [...prev, msgData]);
        }

        listenNewMessage(onUpdateEvent, true);
        updateChatroomConnectTime(userId);

        return () => {
            unSubscribeChatroom(chatroomId);
            listenNewMessage(onUpdateEvent, false);
        };

    }, [ chatroomId, userId ])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [ messages ]);

    useEffect(() => {
        fetchLastConnectTime(userId)
            .then(res => {
                const { statusCode, lastChatroomConnectTime } = res;
                if ( statusCode === 200 ) {
                    setLastConnectTime(new Date(lastChatroomConnectTime));
                }
            })
            .catch(err => {console.error(err)});
    }, [userId])

    function drawUnseenHr(time) {
        if ( firstUnseen && lastConnectTime < new Date(time) ) {
            firstUnseen = false;
            return <StyledHr text="new messages"/>
        }
    }

    return (
        <Container>
            {
                messages.length === 0 ? <NoMessageInfo>No messages yet <br /> start chat right now!</NoMessageInfo> : ""
            }
            <Wrapper>
                {
                    messages.map((msg, idx) => {
                        return (
                            <Fragment key={idx + msg.time} >
                                { drawUnseenHr(msg.time) }
                                <ChatroomMessageItem msg={msg} teacherId={ownerId}/>
                            </Fragment>
                        )
                    })
                }
                <div ref={bottomRef} />
            </Wrapper>
            <ChatroomInput chatroomId={chatroomId}/>
        </Container>
    )
}

export default Chatroom;
