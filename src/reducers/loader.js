import { LOADING } from 'src/actions/loader';

const initialState = {
  loading: false,
};

const loader = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.value,
      };
    default: return { ...state };
  }
};

export default loader;
