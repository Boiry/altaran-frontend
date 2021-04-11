export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';
export const SAVE_USER_INFO = 'SAVE_USER_INFO';

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
