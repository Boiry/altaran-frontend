import {
  UPDATE_COORDINATES_FIELD,
} from '/src/actions/map';

const initialState = {
  region: '',
  sector: '',
  starSystem: '',
};

const map = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_COORDINATES_FIELD:
      return {
        ...state,
        [action.name]: action.value,
      };
    default: return { ...state };
  }
};

export default map;
