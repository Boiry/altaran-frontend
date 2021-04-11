import axios from 'axios';

import { LOGIN, REGISTER, saveUserInfo } from '../actions/user';
import { changePage } from '../actions/router';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { username, password } = store.getState().user;
      axios.post(`http://dyn.estydral.ovh:9090/praland-backend/api/auth/signin`, {
        username,
        password,
      })
        .then((response) => {
          window.sessionStorage.setItem('token', response.data.token);
          store.dispatch(saveUserInfo(true));
          store.dispatch(changePage('map'));
        })
        .catch((error) => {
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
          const message = error.response.data.message;
          const cleanMessage = JSON.parse(message.replace(/\\/g, ''));
          let displayedMessage = "";
          cleanMessage.forEach(element => {
            displayedMessage += element.defaultMessage + '\n';
          });
          window.alert(displayedMessage);
        });
        
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
