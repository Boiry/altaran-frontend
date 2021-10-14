export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const WEBSOCKET_CONNECTED = "WEBSOCKET_CONNECTED";
export const CHANGE_CHANNEL = "CHANGE_CHANNEL";
export const UPDATE_FIELD_VALUE = "UPDATE_FIELD_VALUE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const MESSAGE_TYPING = "MESSAGE_TYPING";
export const MESSAGE_STOP_TYPING = "MESSAGE_STOP_TYPING";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const UPDATE_CHAT_CONTENT = "UPDATE_CHAT_CONTENT";
export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_USER_RESULT = "SEARCH_USER_RESULT";
export const SUBSCRIBE = "SUBSCRIBE";
export const CREATE_NEW_CHANNEL = "CREATE_NEW_CHANNEL";
export const WEBSOCKET_DISCONNECT = "WEBSOCKET_DISCONNECT";

export const webSocketConnect = () => ({
  type: WEBSOCKET_CONNECT,
});

export const webSocketConnected = (value) => ({
  type: WEBSOCKET_CONNECTED,
  value,
});

export const changeChannel = (channel) => ({
  type: CHANGE_CHANNEL,
  channel,
});

export const updateFieldValue = (value) => ({
  type: UPDATE_FIELD_VALUE,
  value,
});

export const sendMessage = (action, payload) => ({
  type: SEND_MESSAGE,
  action,
  payload,
});

export const messageTyping = (sender) => ({
  type: MESSAGE_TYPING,
  sender,
});

export const messageStopTyping = (sender) => ({
  type: MESSAGE_STOP_TYPING,
  sender,
});

export const messageReceived = (key, message, sender, date) => ({
  type: MESSAGE_RECEIVED,
  key,
  message,
  sender,
  date,
});

export const updateChatContent = (content) => ({
  type: UPDATE_CHAT_CONTENT,
  content,
});

export const searchUser = (value) => ({
  type: SEARCH_USER,
  value,
});

export const searchUserResult = (result) => ({
  type: SEARCH_USER_RESULT,
  result,
});

export const subscribe = (userId, userName, createChannel) => ({
  type: SUBSCRIBE,
  userId,
  userName,
  createChannel,
});

export const createNewChannel = (channel) => ({
  type: CREATE_NEW_CHANNEL,
  channel,
});

export const webSocketDisconnect = () => ({
  type: WEBSOCKET_DISCONNECT,
});
