import {
  UPDATE_USER_FIELD,
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
    default: return { ...state };
  }
};

export default user;
