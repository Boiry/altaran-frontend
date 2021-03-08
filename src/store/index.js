import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';
import userMiddleware from 'src/middlewares/user';

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(userMiddleware),
  ),
);

export default store;
