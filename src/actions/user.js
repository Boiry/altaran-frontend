export const UPDATE_USER_FIELD = 'UPDATE_USER_FIELD';
export const LOGIN = 'LOGIN';
export const REGISTER = 'REGISTER';

export const updateUserField = (value, name) => ({
  type: UPDATE_USER_FIELD,
  value,
  name,
});

export const login = (username, password) => ({
  type: LOGIN,
  username,
  password,
});

export const register = (username, email, password, matchingPassword) => ({
  type: REGISTER,
  username,
  email,
  password,
  matchingPassword,
})
