import {
  SAVE_BASE,
  SAVE_BASE_SELECTOR,
  UPDATE_SELECTED_BASE,
  SAVE_FACILITIES_LEVELS,
  CHANGE_CURRENT_FACILITY,
  SAVE_CURRENT_FACILITY,
  SAVE_FACILITIES_UPGRADES,
  SAVE_TECHNOLOGIES_INFO,
  CHANGE_CURRENT_TECHNOLOGY,
  SAVE_TECHNOLOGIES_UPDATES_INFO,
  SAVE_BASE_RESOURCES,
} from '../actions/bases';

const initialState = {
  selectedBase: 'base1',

};

const bases = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_BASE:
      return {
        ...state,
        [`base${action.index}`]: {
          infos: action.base,
        }
      };
    case SAVE_BASE_SELECTOR:
      return {
        ...state,
        ["baseSelector"]: {
          ...state["baseSelector"],
          [`base${action.index}`]: {
            id: action.id,
            name: action.name,
          }
        }
      }
    case UPDATE_SELECTED_BASE:
      return {
        ...state,
        selectedBase: action.selectedBase,
      };
    case SAVE_FACILITIES_LEVELS:
      return {
        ...state,
        [action.base]: {
          ...state[action.base],
          levels: action.levels,
        }
      };
    case CHANGE_CURRENT_FACILITY:
      return {
        ...state,
        [action.base]: {
          ...state[action.base],
          currentFacility: action.facility,
        }
      };
    case SAVE_CURRENT_FACILITY:
      return {
        ...state,
        [action.base]: {
          ...state[action.base],
          nextLevelCost: action.facility,
        }
      }
    case SAVE_FACILITIES_UPGRADES:
      return {
        ...state,
        [action.base]: {
          ...state[action.base],
          upgrades: action.upgrades,
        }
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
    case SAVE_BASE_RESOURCES:
      return {
        ...state,
        [action.base]: {
          ...state[action.base],
          resources: action.resources,
        }
      };
    default: return { ...state };
  }
};

export default bases;
