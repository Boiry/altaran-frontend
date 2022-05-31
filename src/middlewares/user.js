import axios from 'axios';

import {
  LOGIN,
  FORGOTTEN_PASSWORD,
  forgottenPasswordSuccessMessage,
  forgottenPasswordErrorMessage,
  RESET_PASSWORD,
  resetPasswordSuccess,
  resetPasswordError,
  REGISTER,
  waiting,
  saveUserInfo,
  showLoginError,
  deletePassword,
  showUsernameError,
  showPasswordError,
  registerSuccess,
  CONFIRM,
  confirmSuccess,
  LOGOUT,
} from '../actions/user';
import { webSocketDisconnect } from '../actions/chat';
import { changePage } from '../actions/router';

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      store.dispatch(waiting(true));
      const { username, password } = store.getState().user;
      axios.post(`${process.env.API_URL}api/auth/signin`, {
        username,
        password,
      })
        .then((response) => {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('username', store.getState().user.username);
          store.dispatch(saveUserInfo(response.data.id, false));
          store.dispatch(deletePassword());
        })
        .catch((error) => {
          if (error.message.includes("Error") || error.response.status === 500) {
            store.dispatch(showLoginError('Le serveur est indisponible pour le moment.'));
          } else {
            store.dispatch(showLoginError('Les identifiants sont incorrects, veuillez les saisir à nouveau.'));
          }
        })
        .finally(() => {
          store.dispatch(waiting(false));
        });

      next(action);
      break;
    };

    case FORGOTTEN_PASSWORD: {
      const email = action.email;
      const testRegex = /\S+@\S+\.\S+/;
      if (testRegex.test(email)) {
        store.dispatch(forgottenPasswordErrorMessage(''));
        store.dispatch(waiting(true));
        axios({
          method: 'post',
          url: `${process.env.API_URL}user/resetPassword`, 
          params: {email},
        })
          .then(() => {
            store.dispatch(forgottenPasswordSuccessMessage("Un email vous a été envoyé."));
          })
          .catch((error) => {
            console.log(error)
          })
          .finally(() => {
            store.dispatch(waiting(false));
          })
      } else {
        store.dispatch(forgottenPasswordErrorMessage("L'email que vous avez entré est invalide."));
      }

      next(action);
      break;
    }

    case RESET_PASSWORD: {
      const token = window.location.search.slice(7);
      const newPassword = action.newPassword;
      const matchingNewPassword = action.matchingNewPassword;
      if (newPassword === matchingNewPassword) {
        store.dispatch(resetPasswordError(''));
        store.dispatch(waiting(true));
        axios.post(`${process.env.API_URL}user/savePassword`, {
          token,
          newPassword,
          matchingNewPassword,
        })
          .then(() => {
            store.dispatch(resetPasswordSuccess(true));
            setTimeout(() => {
              window.location = process.env.APP_URL;
            }, 5000);
          })
          .catch((error) => {
            store.dispatch(resetPasswordError('Un problème est survenu.'))
          })
          .finally(() => {
            store.dispatch(waiting(false));
          });
      } else {
        store.dispatch(resetPasswordError('Les mots de passe ne correspondent pas.'));
      }

      next(action);
      break;
    }

    case REGISTER: {
      store.dispatch(waiting(true));
      const { username, civilization, email, password, matchingPassword } = store.getState().user;
      axios.post(`${process.env.API_URL}user/registration`, {
        username,
        email,
        password,
        matchingPassword,
      })
        .then((response) => {
          store.dispatch(registerSuccess(true));
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
        })
        .finally(() => {
          store.dispatch(waiting(false));
        });
        
      next(action);
      break;
    };

    case CONFIRM: {
      const token = action.token;
      axios.get(`${process.env.API_URL}registrationConfirm?token=${token}`)
        .then((response) => {
          store.dispatch(confirmSuccess(true));
        })
        .catch((error) => {
          store.dispatch(confirmSuccess(false));
        });
      next(action);
      break;
    }

    case LOGOUT: {
      window.sessionStorage.removeItem("token");
      // store.dispatch(saveUserInfo(null, false));
      // store.dispatch(changePage('login'));
      store.dispatch(webSocketDisconnect());
      next(action);
      break;
    };

    default:
      next(action);
  }
};

export default userMiddleware;
