
import styled from "styled-components";
import { sendMessage } from "../../../utils/socket/socket.js";
import { useState } from "react";

const InputForm = styled.form`
    width: 100%;
    position: sticky;
    bottom: 0;
    padding: 10px 0;
    margin: 10px;
    background-color: snow;
`;

const Textarea = styled.textarea`
    width: 95%;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 20px;
    background-color: #f8f8f8;
    font-size: 18px;
    padding: 5px 0 5px 15px;
`;

function calculateHeight(value) {
    const numberOfLineBreaks = (value.match(/\n/g) || []).length;
    return 40 + numberOfLineBreaks * 20;
}

const ChatroomInput = ({username, chatroomId}) => {

    const [ inputText, setInputText ] = useState('');

    function sendmessage(e) {
        if ( e.keyCode === 13 && e.shiftKey === false && inputText.trim() !== '' ) {
            const msgData = {
                time: new Date().toLocaleString(),
                from: username,
                message: inputText.trim()
            }
            sendMessage( chatroomId, JSON.stringify(msgData) );
            e.target.value = '';
            e.target.style.height = '40px';
            return;
        }
        const newHeight = calculateHeight(inputText);
        e.target.style.height = newHeight + 'px';
    }

    function handleInputChange(event) {
        setInputText(event.target.value);
    }

    return (
        <InputForm>
            <Textarea
                placeholder="Type something"
                onKeyUp={sendmessage}
                onChange={handleInputChange}
            ></Textarea>
        </InputForm>
    )
}

export default ChatroomInput;