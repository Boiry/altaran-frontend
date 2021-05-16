export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const UPDATE_FIELD_VALUE = "UPDATE_FIELD_VALUE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const UPDATE_CHAT_CONTENT = "UPDATE_CHAT_CONTENT";

export const webSocketConnect = () => ({
  type: WEBSOCKET_CONNECT,
});

export const updateFieldValue = (value) => ({
  type: UPDATE_FIELD_VALUE,
  value,
})

export const sendMessage = () => ({
  type: SEND_MESSAGE,
})

export const messageReceived = (key, message, sender, date) => ({
  type: MESSAGE_RECEIVED,
  key,
  message,
  sender,
  date,
})

export const updateChatContent = (content) => ({
  type: UPDATE_CHAT_CONTENT,
  content,
})
