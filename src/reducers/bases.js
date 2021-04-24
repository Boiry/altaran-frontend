import { UPDATE_SELECTED_BASE } from '../actions/bases';

const initialState = {
  selectedBase: 'base1',
};

const bases = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_SELECTED_BASE:
      return {
        ...state,
        selectedBase: action.selectedBase,
      };
    default: return { ...state };
  }
};

export default bases;
