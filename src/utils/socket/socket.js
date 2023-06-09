
import { io } from "socket.io-client";
import { PRODUCTION_BACKEND_DOMAIN } from "../../global/constant.js";

const socket = io(PRODUCTION_BACKEND_DOMAIN, {
    withCredentials: true
});

export function subscribeChatroom( chatroomId ) {
    socket.emit('subscribe', chatroomId);
}

export function unSubscribeChatroom( chatroomId ) {
    socket.emit('unsubscribe', chatroomId);
}

export function sendMessage( chatroomId, msgData ) {
    socket.emit('sendMessage', chatroomId, msgData);
}

export function listenNewMessage( onUpdateEvent, on ) {
    if ( on ) {
        socket.on('newMessage', onUpdateEvent);
    } else {
        socket.off('newMessage', onUpdateEvent);
    }
}

export function generateGPTCodeReview( diffData, number ) {
    socket.emit('codeReview', diffData, number);
}

export function listenGPTCodeReviewResult( onCodeReviewEvent, on ) {
    if ( on ) {
        socket.on('codeReviewResult', onCodeReviewEvent);
    } else {
        socket.off('codeReviewResult', onCodeReviewEvent);
    }
}

export function updateChatroomConnectTime( userId ) {
    socket.emit('chatroomConnect', userId);
}
