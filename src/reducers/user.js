import {
  UPDATE_USER_FIELD,
  WAITING,
  SAVE_USER_INFO,
  SHOW_LOGIN_ERROR,
  DELETE_PASSWORD,
  SHOW_USERNAME_ERROR,
  SHOW_PASSWORD_ERROR,
  REGISTER_SUCCESS,
  CONFIRM_SUCCESS,
} from 'src/actions/user';

const initialState = {
  username: '',
  id: '',
  email: '',
  password: '',
  matchingPassword: '',
  isWaiting: false,
  isLogged: false,
  loginErrorMessage: '',
  usernameErrorMessage: '',
  passwordErrorMessage: '',
  registerSuccess: false,
  confirmSuccess: '',
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_USER_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    case WAITING:
      return {
        ...state,
        isWaiting: action.waiting,
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
    case DELETE_PASSWORD:
      return {
        ...state,
        password: 'password',
      }
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
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.success,
      }
    case CONFIRM_SUCCESS:
      return {
        ...state,
        confirmSuccess: action.success,
      }
    default: return { ...state };
  }
};

export default user;
