import {
  CHANGE_SUBPAGE,
} from '/src/actions/tab';

const initialState = {
  bases: 'description',
  empire: 'statistics',
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
    default: return { ...state };
  }
};

export default tab;
