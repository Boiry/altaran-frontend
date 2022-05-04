import axios from 'axios';

import {
  FETCH_BASES,
  SAVE_BASES,
  saveBase,
  saveBaseSelector,
  FETCH_FACILITIES_LEVELS,
  saveFacilitiesLevels,
  FETCH_CURRENT_FACILITY,
  saveCurrentFacility,
  FETCH_FACILITIES_UPGRADES,
  saveFacilitiesUpgrades,
  ADD_FACILITY_UPGRADE,
  REMOVE_FACILITY_UPGRADE,
  loading,
  GET_SHIPS,
  storeShips,
  DISPATCH_BOOKMARKS,
  SEND_SHIPS,
  FETCH_TECHNOLOGIES,
  saveTechnologiesInfo,
  FETCH_TECHNOLOGIES_UPDATES,
  saveTechnologiesUpdatesInfo,
  FETCH_BASE_RESOURCES,
  saveBaseResources,
} from 'src/actions/bases';

const basesMiddleware = (store) => (next) => (action) => {
  const base = store.getState().bases.selectedBase;
  const token = sessionStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  switch (action.type) {
    case FETCH_BASES: {
      axios.get(`${process.env.API_URL}api/user/planets`, authorization)
      .then((response) => {
        response.data.forEach((base, index) => {
          store.dispatch(saveBase(index+1, base));
          store.dispatch(saveBaseSelector(index+1, base.id, base.name));
        })
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case SAVE_BASES: {
      action.bases.forEach((base, index) => {
        store.dispatch(saveBase(index+1, base));
        store.dispatch(saveBaseSelector(index+1, base.id, base.name));
      })
    };

    case FETCH_FACILITIES_LEVELS: {
      axios.get('/mock/facilitiesLevels.json')
      .then((response) => {
        store.dispatch(saveFacilitiesLevels(base, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case FETCH_CURRENT_FACILITY: {
      const param = action.facility;
      store.dispatch(loading(true));
      axios.get(`${process.env.API_URL}api/user/planets/${action.baseId}/buildingTemplates?name=${param}`, authorization)
      .then((response) => {
        store.dispatch(saveCurrentFacility(action.base, response.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        store.dispatch(loading(false));
      });
      next(action);
      break;
    };

    case FETCH_FACILITIES_UPGRADES: {
      axios.get(`${process.env.API_URL}api/user/planets/${action.baseId}/buildings`, authorization)
      .then((response) => {
        store.dispatch(saveFacilitiesUpgrades(base, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case ADD_FACILITY_UPGRADE: {
      axios.post(`${process.env.API_URL}api/user/planets/${action.baseId}/buildings`, {name: action.facility}, authorization)
      .then((response) => {
        store.dispatch(saveFacilitiesUpgrades(base, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case REMOVE_FACILITY_UPGRADE: {
      axios.delete(`${process.env.API_URL}api/user/planets/${action.baseId}/building/${action.facility}`, authorization)
      .then((response) => {
        store.dispatch(saveFacilitiesUpgrades(base, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case GET_SHIPS: {
      axios.get('/mock/ships.json')
      .then((response) => {
        store.dispatch(storeShips(base, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
      next(action);
      break;
    };

    case DISPATCH_BOOKMARKS: {
      // TODO relier au back
      console.log(JSON.stringify(action.bookmarks))
      next(action);
      break;
    };

    case SEND_SHIPS: {
      // TODO relier au back
      console.log(JSON.stringify(action.ships))
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

    case FETCH_BASE_RESOURCES: {
      axios.get('/mock/baseResources.json')
      .then((response) => {
        store.dispatch(saveBaseResources(base, response.data));
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
};

export default basesMiddleware;
