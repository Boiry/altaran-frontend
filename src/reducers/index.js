import { combineReducers } from 'redux';

import routerReducer from './router';
import userReducer from './user';
import loaderReducer from './loader';
import tabReducer from './tab';
import basesReducer from './bases';
import mapReducer from './map';

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  loader: loaderReducer,
  tab: tabReducer,
  bases: basesReducer,
  map: mapReducer,
});

export default rootReducer;
