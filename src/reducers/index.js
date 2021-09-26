import { combineReducers } from 'redux';

import administrationReducer from './administration';
import basesReducer from './bases';
import chatReducer from './chat';
import loaderReducer from './loader';
import mapReducer from './map';
import miniChatReducer from './miniChat';
import rankingReducer from './ranking';
import routerReducer from './router';
import tabReducer from './tab';
import userReducer from './user';

const rootReducer = combineReducers({
  administration: administrationReducer,
  bases: basesReducer,
  chat: chatReducer,
  loader: loaderReducer,
  map: mapReducer,
  miniChat: miniChatReducer,
  ranking: rankingReducer,
  router: routerReducer,
  tab: tabReducer,
  user: userReducer,
});

export default rootReducer;
