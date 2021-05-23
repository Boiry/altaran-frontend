import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

import {
  WEBSOCKET_CONNECT,
  webSocketConnected,
  SEND_MESSAGE,
  messageTyping,
  messageStopTyping,
  messageReceived,
} from 'src/actions/chat';

let socket, stompClient;

const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      const token = sessionStorage.getItem('token');
      socket = new SockJS(`${process.env.API_URL}ws/`);

      if (!stompClient) {
        stompClient = new Client();
        stompClient.webSocketFactory = () => (socket);
        stompClient.connectHeaders = {Authorization: `Bearer ${token}`};
        stompClient.activate();
      }

      // stompClient = new Client();
      // stompClient.brokerURL = "ws://dyn.estydral.ovh:9090/praland-backend/ws";
      // stompClient.connectHeaders = {Authorization: `Bearer ${token}`};
      // stompClient.activate();

      // stompClient.debug = function(str) {
      //   console.log(str);
      // };

      stompClient.onConnect = function (frame) {
        stompClient.subscribe('/topic/main', onMessageReceived);
        stompClient.subscribe('/topic/help', onMessageReceived);
        stompClient.subscribe('/topic/alliance', onMessageReceived);
        store.dispatch(webSocketConnected(true));
      }

      stompClient.onStompError = (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      }

      function onMessageReceived(newMessage) {
        const message = JSON.parse(newMessage.body);
        if (message.type === "TYPING") {
          store.dispatch(messageTyping(message.sender));
        } else if (message.type === "STOPTYPING") {
          store.dispatch(messageStopTyping(message.sender));
        } else if (message.type === "SEND") {
          const key = newMessage.headers['message-id'];
          store.dispatch(messageReceived(key, message.content, message.sender, message.date));
        }
      }

      next(action);
      break;
    };

    case SEND_MESSAGE: {
      const sender = sessionStorage.getItem('username');
      let message;
      if (action.action === "TYPING") {
        message = {
          sender,
          type: "TYPING",
        }
      } else if (action.action === "STOPTYPING") {
        message = {
          sender,
          type: "STOPTYPING",
        }
      } else if (action.action === "SEND") {
        message = {
          sender,
          date: Date.now(),
          content: store.getState().chat.fieldValue,
          type: "SEND",
        }
      }
      const destination = store.getState().chat.channel;
      stompClient.publish({destination: `/topic/${destination}`, body: JSON.stringify(message)});
      next(action);
      break;
    };

    default:
      next(action);
  }
};

export default chatMiddleware;
