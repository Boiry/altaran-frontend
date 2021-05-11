import {
  UPDATE_USER_FIELD,
  SAVE_USER_INFO,
  SHOW_LOGIN_ERROR,
  SHOW_USERNAME_ERROR,
  SHOW_PASSWORD_ERROR,
} from 'src/actions/user';

const initialState = {
  username: '',
  email: '',
  password: '',
  matchingPassword: '',
  isLogged: false,
  loginErrorMessage: '',
  usernameErrorMessage: '',
  passwordErrorMessage: '',
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
        id: action.id,
        isLogged: action.isLogged,
      };
    case SHOW_LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: action.message,
      };
      case SHOW_USERNAME_ERROR:
      return {
        ...state,
        usernameErrorMessage: action.message,
      };
      case SHOW_PASSWORD_ERROR:
      return {
        ...state,
        passwordErrorMessage: action.message,
      };
    default: return { ...state };
  }
};

export default user;
