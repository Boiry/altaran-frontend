import {
  UPDATE_USER_FIELD,
  SAVE_USER_INFO,
} from '/src/actions/user';

const initialState = {
  username: '',
  email: '',
  password: '',
  matchingPassword: '',
  isLogged: false,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SAVE_USER_INFO:
      return {
        ...state,
        isLogged: action.isLogged,
      };
    default: return { ...state };
  }
};

export default user;
