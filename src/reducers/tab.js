import {
  CHANGE_SUBPAGE,
} from 'src/actions/tab';

import { SET_TAB } from 'src/actions/miniChat';

const initialState = {
  empire: 'statistics',
  bases: 'description',
  communications: "intCom",
  map: 'galaxy',
  administration: 'specialties',
};

const tab = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SUBPAGE:
      return {
        ...state,
        [action.name]: action.subPage,
      };

    case SET_TAB:
      return {
        ...state,
        communications: "extCom",
      }
    default: return { ...state };
  }
};

export default tab;
