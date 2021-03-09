import axios from 'axios';

import {
  LOGIN,
} from 'src/actions/user';
import { REGISTER } from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { username, password } = store.getState().user;
      axios.post(`http://dyn.estydral.ovh:9090/praland-backend/api/auth/signin`, {
        username,
        password,
      })
        .then((response) => {
          // console.log(response);
          // store.dispatch(saveUserInfo(response.data.username));
          window.sessionStorage.setItem('token', response.data.token);
          // console.log(window.localStorage.getItem('token'));
          // window.localStorage.setItem('isLogged', true);
        })
        .catch((error) => {
          // console.log(error);
          window.alert('Les identifiants sont incorrects, veuillez les saisir à nouveau.');
        });

      next(action);
      break;
    }

    case REGISTER: {
      const { username, email, password, matchingPassword } = store.getState().user;
      axios.post(`http://dyn.estydral.ovh:9090/praland-backend/user/registration`, {
        username,
        email,
        password,
        matchingPassword,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(JSON.stringify(error.response.data));
        });
        
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
