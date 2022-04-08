export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD';
export const FORGOTTEN_PASSWORD_SUCCESS_MESSAGE = 'FORGOTTEN_PASSWORD_SUCCESS_MESSAGE';
export const FORGOTTEN_PASSWORD_ERROR_MESSAGE = 'FORGOTTEN_PASSWORD_ERROR_MESSAGE';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const WAITING = 'WAITING';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SHOW_LOGIN_ERROR = 'SHOW_LOGIN_ERROR';
export const DELETE_PASSWORD = 'DELETE_PASSWORD';
export const SHOW_USERNAME_ERROR = 'SHOW_USERNAME_ERROR';
export const SHOW_PASSWORD_ERROR = 'SHOW_PASSWORD_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const CONFIRM = 'CONFIRM';
export const CONFIRM_SUCCESS = 'CONFIRM_SUCCESS';
export const DELETE_USER_MESSAGES = 'DELETE_USER_MESSAGES';
export const LOGOUT = 'LOGOUT';

export const updateUserField = (value, name) => ({
  type: UPDATE_USER_FIELD,
  value,
  name,
});

export const forgottenPassword = (email) => ({
  type: FORGOTTEN_PASSWORD,
  email,
});

export const forgottenPasswordSuccessMessage = (message) => ({
  type: FORGOTTEN_PASSWORD_SUCCESS_MESSAGE,
  message,
})

export const forgottenPasswordErrorMessage = (message) => ({
  type: FORGOTTEN_PASSWORD_ERROR_MESSAGE,
  message,
});

export const resetPassword = (newPassword, matchingNewPassword) => ({
  type: RESET_PASSWORD,
  newPassword,
  matchingNewPassword,
});

export const resetPasswordSuccess = (success) => ({
  type: RESET_PASSWORD_SUCCESS,
  success,
});

export const resetPasswordError = (error) => ({
  type: RESET_PASSWORD_ERROR,
  error,
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
});

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
});

export const confirm = (token) => ({
  type: CONFIRM,
  token,
});

export const confirmSuccess = (success) => ({
  type: CONFIRM_SUCCESS,
  success,
});

export const deleteUserMessages = () => ({
  type: DELETE_USER_MESSAGES,
});

export const logout = () => ({
  type: LOGOUT,
});

