export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const SHOW_USERNAME_ERROR = 'SHOW_USERNAME_ERROR';
export const SHOW_PASSWORD_ERROR = 'SHOW_PASSWORD_ERROR';

export const updateUserField = (value, name) => ({
  type: UPDATE_USER_FIELD,
  value,
  name,
});

export const login = () => ({
  type: LOGIN,
});

export const register = () => ({
  type: REGISTER,
});

export const saveUserInfo = (isLogged) => ({
  type: SAVE_USER_INFO,
  isLogged,
});

export const showLoginError = (message) => ({
  type: SHOW_LOGIN_ERROR,
  message,
});

export const showUsernameError = (message) => ({
  type: SHOW_USERNAME_ERROR,
  message,
});

export const showPasswordError = (message) => ({
  type: SHOW_PASSWORD_ERROR,
  message,
});
