import axios from 'axios';

import {
  FETCH_RANKING,
  saveRanking,
  FETCH_PLAYERS,
  savePlayers,
  FETCH_PERSONAL_RANKING,
  savePersonalRanking
} from 'src/actions/ranking';

const rankingMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_RANKING: {
      axios.get('/mock/ranking.json')
      .then((response) => {
        store.dispatch(saveRanking(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    }

    case FETCH_PLAYERS: {
      axios.get('/mock/nbPlayers.json')
      .then((response) => {
        store.dispatch(savePlayers(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    }

    case FETCH_PERSONAL_RANKING: {
      axios.get('/mock/personalRanking.json')
      .then((response) => {
        store.dispatch(savePersonalRanking(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    }

    default:
      next(action);
  }
}

export default rankingMiddleware;
