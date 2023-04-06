
import styled from "styled-components";
import { socket } from "../../../../utils/socket/socket";

const InputForm = styled.form`
    margin-bottom: 30px;
    width: 100%;
    position: sticky;
    bottom: 30px;
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

const ViewChatroomInput = () => {

    function sendmessage(e) {
        if ( e.keyCode == 13 ) {
            if ( e.shiftKey == false ) {
                // submit message
                socket.emit('newMessage', {
                    message: e.target.value
                })
            }
        }
    }

    function resize(e) {
        if ( e.keyCode == 13 && e.shiftKey == false ) {
            e.target.value = '';
            e.target.style.height = '40px';
            return;
        }
        const value = e.target.value;
        const newHeight = calculateHeight(value);
        e.target.style.height = newHeight + 'px';
    }

    return (
        <InputForm>
            <Textarea
                placeholder="Type something"
                onKeyDown={sendmessage}
                onKeyUp={resize}
            ></Textarea>
        </InputForm>
    )
}

export default ViewChatroomInput;