import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import userMiddleware from 'src/middlewares/user';
import basesMiddleware from 'src/middlewares/bases';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      userMiddleware,
      basesMiddleware,
    ),
  ),
);

export default store;
