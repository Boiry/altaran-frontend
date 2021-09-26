import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import administrationMiddleware from 'src/middlewares/administration';
import basesMiddleware from 'src/middlewares/bases';
import chatMiddleware from 'src/middlewares/chat';
import mapMiddleware from 'src/middlewares/map';
import rankingMiddleware from 'src/middlewares/ranking';
import userMiddleware from 'src/middlewares/user';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      administrationMiddleware,
      basesMiddleware,
      chatMiddleware,
      mapMiddleware,
      rankingMiddleware,
      userMiddleware,
    ),
  ),
);

export default store;
