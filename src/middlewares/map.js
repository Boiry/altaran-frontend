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
  setStarSystemLoading,
} from '../actions/map';

let token, authorization;

const mapMiddleware = (store) => (next) => (action) => {
  token = sessionStorage.getItem('token');
  authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  switch (action.type) {
    case FETCH_STAR_SYSTEM: {
      const region = action.region;
      const sector = action.sector;
      const starSystem = action.starSystem;
      store.dispatch(setStarSystemLoading(true));
      axios.get(`${process.env.API_URL}api/exploration/regions/${region}/sectors/${sector}/starsystems/${starSystem}`, authorization)
      .then((response) => {
        store.dispatch(saveStarSystemInfo(response.data));
      })
      .catch((error) => {
        store.dispatch(saveStarSystemInfo("no system"));
      })
      .finally(() => {
        store.dispatch(setStarSystemLoading(false));
      });
      next(action);
      break;
    }

    case FETCH_REGIONS: {
      axios.get(`${process.env.API_URL}api/exploration/regions`, authorization)
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
      axios.get(`${process.env.API_URL}api/exploration/regions/${region}/sectors`, authorization)
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
      axios.get(`${process.env.API_URL}api/exploration/regions/${region}/sectors/${sector}/starsystems`, authorization)
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
