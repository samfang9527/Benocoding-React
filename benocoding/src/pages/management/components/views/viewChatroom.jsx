
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import ViewChatroomMessageItem from "./viewChatroomMessageItem";
import ViewChatroomInput from "./viewChatroomInput";
import { socket } from "../../../../utils/socket/socket.js";


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

    useEffect(() => {
      socket.emit('joinChatroom', viewData.chatroomId);
      console.log('run');

      function onUpdateEvent(message) {
          setMessages(prev => [...prev, message]);
      }

      socket.on('update', onUpdateEvent);

      return () => {
          socket.off('update', onUpdateEvent);
      };

    }, [])

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
          <ViewChatroomInput/>
      </Container>
  )
}

export default ViewChatroom;
