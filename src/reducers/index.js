import { combineReducers } from 'redux';

import routerReducer from './router';
import userReducer from './user';

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
});

export default rootReducer;
