import {
  UPDATE_SELECTED_BASE,
  SAVE_FACILITIES_INFO,
  CHANGE_CURRENT_FACILITY,
  SAVE_FACILITIES_UPDATES_INFO,
  SAVE_TECHNOLOGIES_INFO,
  CHANGE_CURRENT_TECHNOLOGY,
  SAVE_TECHNOLOGIES_UPDATES_INFO,
  SAVE_BASE_INFOS,
} from '../actions/bases';

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
    case SAVE_FACILITIES_INFO:
      return {
        ...state,
        [action.name]: action.facilities,
      };
    case CHANGE_CURRENT_FACILITY:
      return {
        ...state,
        [action.name]: action.item,
      };
    case SAVE_FACILITIES_UPDATES_INFO:
      return {
        ...state,
        [action.name]: action.updates,
      };
    case SAVE_TECHNOLOGIES_INFO:
      return {
        ...state,
        [action.name]: action.technologies,
      };
    case CHANGE_CURRENT_TECHNOLOGY:
      return {
        ...state,
        [action.name]: action.item,
      };
    case SAVE_TECHNOLOGIES_UPDATES_INFO:
      return {
        ...state,
        [action.name]: action.updates,
      };
    case SAVE_BASE_INFOS:
      return {
        ...state,
        [action.name]: action.infos,
      };
    default: return { ...state };
  }
};

export default bases;
