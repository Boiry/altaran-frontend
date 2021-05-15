import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import userMiddleware from 'src/middlewares/user';
import basesMiddleware from 'src/middlewares/bases';
import mapMiddleware from 'src/middlewares/map';
import chatMiddleware from 'src/middlewares/chat';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      userMiddleware,
      basesMiddleware,
      mapMiddleware,
      chatMiddleware,
    ),
  ),
);

export default store;
