import axios from 'axios';

import { LOGIN, REGISTER, saveUserInfo, showLoginError, showUsernameError, showPasswordError } from '../actions/user';
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
          store.dispatch(changePage('colonies'));
        })
        .catch((error) => {
          store.dispatch(showLoginError('Les identifiants sont incorrects, veuillez les saisir à nouveau.'));
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

          // Username/email error
          let usernameErrorMessage = '';
          if (message.search("Invalid") !== -1) {
            usernameErrorMessage = "Email invalide.";
          }
          if (message.search("account") !== -1) {
            usernameErrorMessage = "Ce compte existe déjà.";
          }
          store.dispatch(showUsernameError(usernameErrorMessage));

          // Password error
          let passwordErrorMessage = '';
          if (message.search("length") !== -1 || message.search("uppercase") || message.search("digit") || message.search("special")) {
            passwordErrorMessage = 'Le mot de passe doit contenir au moins 8 caractères dont une majuscule, un chiffre et un caractère spécial.';
          }
          if (message.match(/\'.*\'/)) {
            const sequence = message.match(/\'.*\'/);
            if (passwordErrorMessage.length === 0) {
              passwordErrorMessage = "La séquence '" + sequence + "' n'est pas autorisée.";
            } else {
              passwordErrorMessage += " De plus, la séquence '" + sequence + "' n'est pas autorisée.";
            }
          }
          store.dispatch(showPasswordError(passwordErrorMessage));
        });
        
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default userMiddleware;
