import {
  CHANGE_CHANNEL,
  UPDATE_FIELD_VALUE,
  MESSAGE_TYPING,
  MESSAGE_STOP_TYPING,
  MESSAGE_RECEIVED
} from 'src/actions/chat';

const initialState = {
  channel: 'main',
  fieldValue: '',
  messageTyping: [],
  chatContent: [],
};

const chat = (state = initialState, action = {}) => {
  const user = sessionStorage.getItem('username');
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        ...state,
        channel: action.channel,
      }

    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        fieldValue: action.value,
      }

    case MESSAGE_TYPING:
      if (action.sender !== user && state.messageTyping.indexOf(action.sender) === -1) {
        return {
          ...state,
          messageTyping: [...state.messageTyping, action.sender],
        }
      }
      return {...state}

    case MESSAGE_STOP_TYPING:
      return {
        ...state,
        messageTyping: state.messageTyping.filter(sender => sender !== action.sender),
      }

    case MESSAGE_RECEIVED:
      const message = {
        key: action.key,
        author: action.sender,
        content: action.message,
        date: action.date,
      }
      if (action.sender === user) {
        return {
          ...state,
          chatContent: [...state.chatContent, message],
          fieldValue: '',
        }
      } else {
        return {
          ...state,
          chatContent: [...state.chatContent, message],
          messageTyping: state.messageTyping.filter(sender => sender !== action.sender),
        }
      }

    default: return { ...state };
  }
};

export default chat;
