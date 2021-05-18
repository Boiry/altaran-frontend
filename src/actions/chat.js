export const WEBSOCKET_CONNECT = "WEBSOCKET_CONNECT";
export const CHANGE_CHANNEL = "CHANGE_CHANNEL";
export const UPDATE_FIELD_VALUE = "UPDATE_FIELD_VALUE";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const MESSAGE_TYPING = "MESSAGE_TYPING";
export const MESSAGE_STOP_TYPING = "MESSAGE_STOP_TYPING";
export const MESSAGE_RECEIVED = "MESSAGE_RECEIVED";
export const UPDATE_CHAT_CONTENT = "UPDATE_CHAT_CONTENT";

export const webSocketConnect = () => ({
  type: WEBSOCKET_CONNECT,
});

export const changeChannel = (channel) => ({
  type: CHANGE_CHANNEL,
  channel,
})

export const updateFieldValue = (value) => ({
  type: UPDATE_FIELD_VALUE,
  value,
})

export const sendMessage = (action) => ({
  type: SEND_MESSAGE,
  action,
})

export const messageTyping = (sender) => ({
  type: MESSAGE_TYPING,
  sender,
})

export const messageStopTyping = (sender) => ({
  type: MESSAGE_STOP_TYPING,
  sender,
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
