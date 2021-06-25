import {
  SAVE_RANKING,
  SAVE_PLAYERS,
  SAVE_PERSONAL_RANKING,
} from 'src/actions/ranking';

const initialState = {
  ranking: {},
  nbPlayers: 0,
  personalRanking: {},
};

const ranking = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RANKING:
      return {
        ...state,
        ranking: action.ranking,
      };

    case SAVE_PLAYERS:
      return {
        ...state,
        nbPlayers: action.nbPlayers.nbPlayers,
      };

    case SAVE_PERSONAL_RANKING:
      return {
        ...state,
        personalRanking: action.ranking,
      };

    default: return { ...state };
  }
};

export default ranking;
