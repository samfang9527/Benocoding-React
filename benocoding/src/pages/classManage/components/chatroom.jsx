
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
} from "../../../utils/socket/socket.js";


const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
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
                            message
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


const Chatroom = ({classData}) => {

    const bottomRef = useRef(null);
    const [ messages, setMessages ] = useState([]);
    const authContext = useContext(AuthContext);

    const { chatroomId } = classData;
    const { user } = authContext;

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

        return () => {
            unSubscribeChatroom(chatroomId);
            listenNewMessage(onUpdateEvent, false);
        };

    }, [ chatroomId ])

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [ messages ]);

  return (
      <Container>
          <Wrapper>
              {
                  messages.map((msg, idx) => {
                      return <ChatroomMessageItem msg={msg} key={idx + msg.time}/>
                  })
              }
              <div ref={bottomRef} />
          </Wrapper>
          <ChatroomInput username={user.username} chatroomId={chatroomId}/>
      </Container>
  )
}

export default Chatroom;
