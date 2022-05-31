import {
  GO_TO_CIVILIZATIONS_GUIDE,
  GO_TO_CIVILIZATIONS_GUIDE_DONE,
  UPDATE_USER_FIELD,
  WAITING,
  SAVE_USER_INFO,
  SHOW_LOGIN_ERROR,
  DELETE_PASSWORD,
  SHOW_USERNAME_ERROR,
  SHOW_PASSWORD_ERROR,
  FORGOTTEN_PASSWORD_SUCCESS_MESSAGE,
  FORGOTTEN_PASSWORD_ERROR_MESSAGE,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  REGISTER_SUCCESS,
  CONFIRM_SUCCESS,
  DELETE_USER_MESSAGES,
} from 'src/actions/user';

const initialState = {
  goToCivilizationsGuide: false,
  username: '',
  civilization: '',
  id: '',
  email: '',
  password: '',
  matchingPassword: '',
  isWaiting: false,
  isLogged: false,
  loginErrorMessage: '',
  usernameErrorMessage: '',
  passwordErrorMessage: '',
  forgottenPasswordSuccessMessage: '',
  forgottenPasswordErrorMessage: '',
  resetPasswordSuccess: false,
  resetPasswordError: '',
  registerSuccess: false,
  confirmSuccess: '',
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case GO_TO_CIVILIZATIONS_GUIDE:
      return {
        ...state,
        goToCivilizationsGuide: action.value,
      };
    case GO_TO_CIVILIZATIONS_GUIDE_DONE:
      return {
        ...state,
        goToCivilizationsGuide: false,
      };
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
        password: '',
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
    case FORGOTTEN_PASSWORD_SUCCESS_MESSAGE:
      return {
        ...state,
        forgottenPasswordSuccessMessage: action.message,
      };
    case FORGOTTEN_PASSWORD_ERROR_MESSAGE:
      return {
        ...state,
        forgottenPasswordErrorMessage: action.message,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.success,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: action.error,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: action.success,
      };
    case CONFIRM_SUCCESS:
      return {
        ...state,
        confirmSuccess: action.success,
      };
    case DELETE_USER_MESSAGES:
      return {
        ...state,
        loginErrorMessage: '',
        usernameErrorMessage: '',
        passwordErrorMessage: '',
        forgottenPasswordSuccessMessage: '',
        forgottenPasswordErrorMessage: '',
        resetPasswordError: '',
      };
    default: return { ...state };
  }
};

export default user;
