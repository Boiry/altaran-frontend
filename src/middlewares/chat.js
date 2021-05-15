import SockJS from 'sockjs-client';
import { io } from 'socket.io-client';
import SockJsClient from 'react-stomp';

import { WEBSOCKET_CONNECT } from 'src/actions/chat';

let socket;

const token = sessionStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const chatMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case WEBSOCKET_CONNECT: {
      socket = new SockJS('http://dyn.estydral.ovh:9090/ws', null, authorization);
      // socket = new WebSocket('ws://dyn.estydral.ovh:9090/ws/');
      // socket = io('http://dyn.estydral.ovh:9090/ws');
      // socket = new SockJsClient('wss://echo.websocket.org');
      console.log(socket);
    }



    default:
      next(action);
  }
};

export default chatMiddleware;
