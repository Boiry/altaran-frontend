import { combineReducers } from 'redux';

import routerReducer from './router';
import userReducer from './user';
import loaderReducer from './loader';
import tabReducer from './tab';
import basesReducer from './bases';
import chatReducer from './chat';
import mapReducer from './map';

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  loader: loaderReducer,
  tab: tabReducer,
  bases: basesReducer,
  chat: chatReducer,
  map: mapReducer,
});

export default rootReducer;
