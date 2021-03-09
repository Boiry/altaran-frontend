import {
  CHANGE_PAGE,
} from '/src/actions/router';

const initialState = {
  page: 'login',
};

const router = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page,
      };
    default: return { ...state };
  }
};

export default router;
