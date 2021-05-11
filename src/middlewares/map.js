import axios from 'axios';

import {
  FETCH_STAR_SYSTEM,
  saveStarSystemInfo,
  FETCH_REGIONS,
  saveRegionsInfo,
  FETCH_SECTORS,
  saveSectorsInfo,
  FETCH_STAR_SYSTEMS,
  saveStarSystemsInfo,
  setSectorsLoading,
  setStarSystemsLoading,
} from '../actions/map';

const mapMiddleware = (store) => (next) => (action) => {
  const token = sessionStorage.getItem('token');
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  switch (action.type) {
    case FETCH_STAR_SYSTEM: {
      const region = action.region;
      const sector = action.sector;
      const starSystem = action.starSystem;
      axios.get(`http://dyn.estydral.ovh:9090/praland-backend/api/exploration/regions/${region}/sectors/${sector}/starsystems/${starSystem}`, authorization)
      .then((response) => {
        store.dispatch(saveStarSystemInfo(response.data));
      })
      .catch((error) => {
        store.dispatch(saveStarSystemInfo("Ce système n'existe pas"));
      });
      next(action);
      break;
    }

    case FETCH_REGIONS: {
      axios.get(`http://dyn.estydral.ovh:9090/praland-backend/api/exploration/regions`, authorization)
      .then((response) => {
        store.dispatch(saveRegionsInfo(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
      next(action);
      break;
    }

    case FETCH_SECTORS: {
      const region = action.region;
      store.dispatch(setSectorsLoading(true));
      axios.get(`http://dyn.estydral.ovh:9090/praland-backend/api/exploration/regions/${region}/sectors`, authorization)
      .then((response) => {
        store.dispatch(saveSectorsInfo(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        store.dispatch(setSectorsLoading(false));
      })
      next(action);
      break;
    }

    case FETCH_STAR_SYSTEMS: {
      const region = action.region;
      const sector = action.sector;
      store.dispatch(setStarSystemsLoading(true));
      axios.get(`http://dyn.estydral.ovh:9090/praland-backend/api/exploration/regions/${region}/sectors/${sector}/starsystems`, authorization)
      .then((response) => {
        store.dispatch(saveStarSystemsInfo(response.data));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        store.dispatch(setStarSystemsLoading(false));
      });
      next(action);
      break;
    }

    default:
      next(action);
  }
};

export default mapMiddleware;
