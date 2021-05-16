import { UPDATE_FIELD_VALUE, MESSAGE_RECEIVED } from 'src/actions/chat';

const initialState = {
  fieldValue: '',
  chatContent: [],
};

const chat = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_FIELD_VALUE:
      return {
        ...state,
        fieldValue: action.value,
      };
      case MESSAGE_RECEIVED:
        const message = {
          key: action.key,
          author: action.sender,
          content: action.message,
          date: action.date,
        }
        return {
          ...state,
          chatContent: [...state.chatContent, message],
          fieldValue: '',
        }
    default: return { ...state };
  }
};

export default chat;
