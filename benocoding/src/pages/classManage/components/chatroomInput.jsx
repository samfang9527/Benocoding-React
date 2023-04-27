
import styled from "styled-components";
import { sendMessage } from "../../../utils/socket/socket.js";
import { useState } from "react";

const InputForm = styled.form`
    width: 100%;
    position: sticky;
    bottom: 0;
    padding: 10px;
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


const ChatroomInput = ({username, chatroomId}) => {

    const [ inputText, setInputText ] = useState('');
    const [ isComposing, setIsComposing ] = useState(false);

    function sendmessage(e) {
        if ( e.key !== 'Enter' ) {
            return;
        }

        if ( isComposing ) {
            setIsComposing(false);
            return;
        }

        if ( e.shiftKey === false && inputText.trim() !== '' ) {
            console.log(inputText)
            e.preventDefault();
            const msgData = {
                time: new Date().toLocaleString(),
                from: username,
                message: inputText.trim()
            }
            sendMessage( chatroomId, JSON.stringify(msgData) );
            setInputText('');
            e.target.style.height = `40px`;
            return;
        }
    }

    function handleInputHeight(e) {
        e.target.style.height = "";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    function handleInputChange(event) {
        setInputText(event.target.value);
    }

    return (
        <InputForm>
            <Textarea
                placeholder="Type something"
                onInput={handleInputHeight}
                onKeyDown={sendmessage}
                onChange={handleInputChange}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onCompositionUpdate={() => setIsComposing(true)}
                value={inputText}
            ></Textarea>
        </InputForm>
    )
}

export default ChatroomInput;