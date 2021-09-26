import { SAVE_POLITICS } from 'src/actions/administration';

const initialState = {
  politics: '',
};

const administration = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_POLITICS:
      return {
        ...state,
        politics: action.politics,
      };
    
    default: return { ...state };
  }
}

export default administration;
