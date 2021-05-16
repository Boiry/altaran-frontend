import SockJS from 'sockjs-client';
import { io } from 'socket.io-client';
import SockJsClient from 'react-stomp';
import Stomp from 'stompjs';

import {
  WEBSOCKET_CONNECT,
  SEND_MESSAGE,
  messageReceived,

} from 'src/actions/chat';

let socket, stompClient;

const token = sessionStorage.getItem('token');
  const authorization = {
    Authorization: `Bearer ${token}`,
  };

const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      // socket = new SockJS('http://dyn.estydral.ovh:9090/praland-backend/ws', null, authorization);
      socket = new SockJS(`${process.env.API_URL}ws/`);
      // socket = new WebSocket('ws://dyn.estydral.ovh:9090/praland-backend/ws');
      // socket = io('http://dyn.estydral.ovh:9090/praland-backend/ws');
      // socket = new SockJsClient('wss://echo.websocket.org');

      if (!stompClient) {
        stompClient = Stomp.over(socket);
        stompClient.connect(authorization, onConnected, onError);
      }

      function onConnected() {
        stompClient.subscribe('/topic/pubic', onMessageReceived);
      }

      function onError() {
        console.log("Connection error")
      }

      function onMessageReceived(newMessage) {
        const message = JSON.parse(newMessage.body);
        const key = message.sender + message.dateTime;
        store.dispatch(messageReceived(key, message.content, message.sender, message.dateTime));
      }
      next(action);
      break;
    };

    case SEND_MESSAGE: {
      let sender = store.getState().user.username;
      if (!sender) {
        sender = sessionStorage.getItem('username');
      }
      const message = {
        sender: sender,
        content: store.getState().chat.fieldValue,
        type: "CHAT",
      }
      stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
      next(action);
      break;
    };

    default:
      next(action);
  }
};

export default chatMiddleware;
