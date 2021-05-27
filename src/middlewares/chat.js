import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

import {
  WEBSOCKET_CONNECT,
  webSocketConnected,
  SEND_MESSAGE,
  messageTyping,
  messageStopTyping,
  messageReceived,
  SEARCH_USER,
  searchUserResult,
  SUBSCRIBE,
  subscribe,
  createNewChannel,
} from 'src/actions/chat';

let userName, token, authorization, socket, stompClient;

const chatMiddleware = (store) => (next) => (action) => {
  userName = sessionStorage.getItem('username');
  token = sessionStorage.getItem('token');
  authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function onMessageReceived(newMessage) {
    const channel = store.getState().chat.channel.path;
    const channels = store.getState().chat.channels;
    const message = JSON.parse(newMessage.body);
    if (message.type === "TYPING" && message.destination === channel) {
      store.dispatch(messageTyping(message.sender));
    } else if (message.type === "STOPTYPING" && message.destination === channel) {
      store.dispatch(messageStopTyping(message.sender));
    } else if (message.type === "SEND") {
      const key = newMessage.headers['message-id'];
      store.dispatch(messageReceived(key, message.content, message.sender, message.date));
      let alreadyExists = false;
      for (let i=0, length=channels.length; i<length; i++) {
        if (channels[i].path === message.destination) {
          alreadyExists = true;
          break;
        }
      }
      if (!alreadyExists) {
        store.dispatch(createNewChannel({name: message.sender, path: message.destination}));
      }
    } else if (message.type === "JOIN") {
      store.dispatch(subscribe(message.payload[0], message.payload[1], false));
    }
  }

  switch (action.type) {
    case WEBSOCKET_CONNECT: {
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
        store.dispatch(webSocketConnected(true));
        stompClient.subscribe('/topic/join', onMessageReceived);
        stompClient.subscribe('/topic/main', onMessageReceived);
        stompClient.subscribe('/topic/help', onMessageReceived);
        stompClient.subscribe('/topic/alliance', onMessageReceived);
      }

      stompClient.onStompError = (frame) => {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      }

      next(action);
      break;
    };

    case SEND_MESSAGE: {
      const sender = userName;
      const channel = store.getState().chat.channel.path;
      let message;
      if (action.action === "TYPING") {
        message = {
          sender,
          type: "TYPING",
          destination: channel,
        }
      } else if (action.action === "STOPTYPING") {
        message = {
          sender,
          type: "STOPTYPING",
          destination: channel,
        }
      } else if (action.action === "SEND") {
        message = {
          sender,
          date: Date.now(),
          content: store.getState().chat.fieldValue,
          type: "SEND",
          destination: channel,
        }
      } else if (action.action === "JOIN") {
        message = {
          type: "JOIN",
          payload: action.payload,
        }
      }
      let destination;
      if (action.action === "JOIN") {
        destination = 'join';
      } else {
        destination = channel;
      }
      stompClient.publish({destination: `/topic/${destination}`, body: JSON.stringify(message)});
      next(action);
      break;
    };

    case SEARCH_USER: {
      const searchValue = action.value;
      if (searchValue && searchValue.length > 1) {
        axios.get(`${process.env.API_URL}api/user/users?search=${searchValue}`, authorization)
        .then((response) => {
          if (response.data.length > 0) {
            const filteredResponse = response.data.filter(user => user.username !== userName);
            store.dispatch(searchUserResult(filteredResponse));
          }
        })
        .catch((error) => {
          console.log(error)
        });
      } else {
        store.dispatch(searchUserResult(''));
      }

      next(action);
      break;
    };

    case SUBSCRIBE: {
      const userId = store.getState().user.id;
      const otherUserId = action.userId;
      const userName = action.userName;
      let newChannel;
      if (userId < otherUserId) {
        newChannel = `user${userId}to${otherUserId}`;
      } else {
        newChannel = `user${otherUserId}to${userId}`;
      }
      const channels = store.getState().chat.channels;
      let alreadyExists = false;
      for (let i=0; i<channels.length; i++) {
        if (channels[i].path === newChannel) alreadyExists = true;
      }
      if (!alreadyExists) {
        stompClient.subscribe(`/topic/${newChannel}`, onMessageReceived);
        if (action.createChannel) {
          store.dispatch(createNewChannel({name: userName, path: newChannel}));
        }
      }
      next(action);
      break;
    };

    default:
      next(action);
  }
};

export default chatMiddleware;
