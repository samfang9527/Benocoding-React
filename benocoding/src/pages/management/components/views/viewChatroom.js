
import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import { socket } from "../../../../utils/socket/socket";
import ViewChatroomMessageItem from "./viewChatroomMessageItem";
import ViewChatroomInput from "./viewChatroomInput";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const testMessages = ['dalfjkvndlf', 'afgargaer', 'ijlnnjeg'];

const ViewChatroom = () => {

    const bottomRef = useRef(null);

    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState(testMessages);
    
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, []);

      useEffect(() => {
        function onUpdateEvent(message) {
            setMessages(prev => [...prev, message]);
        }

        socket.on('update', onUpdateEvent)

        return () => {
            socket.off('update', onUpdateEvent);
        };

      }, [])

      useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [messages]);

    return (
        <>
            <Wrapper>
                {
                    messages.map((msg, idx) => {
                        return <ViewChatroomMessageItem msg={msg} key={idx}/>
                    })
                }
                <div ref={bottomRef} />
            </Wrapper>
            <ViewChatroomInput/>
        </>
    )
}

export default ViewChatroom;
