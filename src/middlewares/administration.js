import axios from 'axios';

import {
  FETCH_POLITICS,
  savePolitics,
} from 'src/actions/administration';

const administrationMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_POLITICS: {
      axios.get('/mock/administration.json')
      .then((response) => {
        store.dispatch(savePolitics(response.data.politics));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    default:
      next(action);
  }
}

export default administrationMiddleware;
