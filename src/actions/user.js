export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const WAITING = 'WAITING';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';
export const SHOW_USERNAME_ERROR = 'SHOW_USERNAME_ERROR';
export const SHOW_PASSWORD_ERROR = 'SHOW_PASSWORD_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT = 'LOGOUT';

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

export const waiting = (waiting) => ({
  type: WAITING,
  waiting,
})

export const saveUserInfo = (id, isLogged) => ({
  type: SAVE_USER_INFO,
  id,
  isLogged,
});

export const showLoginError = (message) => ({
  type: SHOW_LOGIN_ERROR,
  message,
});

export const deletePassword = () => ({
  type: DELETE_PASSWORD,
});

export const showUsernameError = (message) => ({
  type: SHOW_USERNAME_ERROR,
  message,
});

export const showPasswordError = (message) => ({
  type: SHOW_PASSWORD_ERROR,
  message,
});

export const registerSuccess = (success) => ({
  type: REGISTER_SUCCESS,
  success,
})

export const logout = () => ({
  type: LOGOUT,
});
