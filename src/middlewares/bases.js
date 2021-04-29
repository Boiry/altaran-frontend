import axios from 'axios';

import {
  FETCH_FACILITIES,
  saveFacilitiesInfo,
  FETCH_FACILITIES_UPDATES,
  saveFacilitiesUpdatesInfo,
  FETCH_TECHNOLOGIES,
  saveTechnologiesInfo,
  FETCH_TECHNOLOGIES_UPDATES,
  saveTechnologiesUpdatesInfo,
} from 'src/actions/bases';

const basesMiddleware = (store) => (next) => (action) => {
  const base = store.getState().bases.selectedBase;
  switch (action.type) {
    case FETCH_FACILITIES: {
      axios.get('/mock/facilities.json')
      .then((response) => {
        store.dispatch(saveFacilitiesInfo(`${base}Facilities`, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case FETCH_FACILITIES_UPDATES: {
      axios.get('/mock/updates.json')
      .then((response) => {
        store.dispatch(saveFacilitiesUpdatesInfo(`${base}FacilitiesUpdates`, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case FETCH_TECHNOLOGIES: {
      axios.get('/mock/technologies.json')
      .then((response) => {
        store.dispatch(saveTechnologiesInfo(`${base}Technologies`, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case FETCH_TECHNOLOGIES_UPDATES: {
      axios.get('/mock/technologies-updates.json')
      .then((response) => {
        store.dispatch(saveTechnologiesUpdatesInfo(`${base}TechnologiesUpdates`, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    default:
      next(action);
  }
};

export default basesMiddleware;
