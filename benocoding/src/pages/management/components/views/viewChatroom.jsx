
import axios from "axios";
import styled from "styled-components";
import React, { useState, useEffect, useRef, useContext } from "react";
import ViewChatroomMessageItem from "./viewChatroomMessageItem";
import ViewChatroomInput from "./viewChatroomInput";
import { socket } from "../../../../utils/socket/socket.js";
import { BACKEND_API_URL } from "../../../../global/constant.js";
import { UserContext } from "../..";


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


const ViewChatroom = ({viewData}) => {

    const bottomRef = useRef(null);

    const [messages, setMessages] = useState([]);
    
    const userInfo = useContext(UserContext);

    useEffect(() => {
        // update messages from DB
        axios({
            url: BACKEND_API_URL,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                query: `
                    query($chatroomId: String!) {
                        getMessages(chatroomId: $chatroomId) {
                            time,
                            from,
                            message
                        }
                    }
                `,
                variables: {
                    chatroomId: viewData.chatroomId
                }
            }
        })
        .then(res => {
            const data = res.data;
            const msgs = data.data.getMessages;
            console.log(msgs);
            setMessages(msgs);
        })
        .catch(err => {console.error(err)})

        socket.emit('joinChatroom', viewData.chatroomId);

        function onUpdateEvent(msgData) {
            setMessages(prev => [...prev, msgData]);
        }

        socket.on('update', onUpdateEvent);

        return () => {
            socket.off('update', onUpdateEvent);
            socket.disconnect();
            socket.connect();
        };

    }, [viewData.chatroomId])

    useEffect(() => {
      // 👇️ scroll to bottom every time messages change
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

  return (
      <Container>
          <Wrapper>
              {
                  messages.map((msg, idx) => {
                      return <ViewChatroomMessageItem msg={msg} key={idx}/>
                  })
              }
              <div ref={bottomRef} />
          </Wrapper>
          <ViewChatroomInput username={userInfo.username}/>
      </Container>
  )
}

export default ViewChatroom;