import { IS_OPENED } from 'src/actions/miniChat';

const initialState = {
  isOpened: true,
}

const miniChat = (state = initialState, action = {}) => {
  switch (action.type) {
    case IS_OPENED:
      return {
        ...state,
        isOpened: action.value,
      }
    default: return { ...state };
  }
}

export default miniChat;
