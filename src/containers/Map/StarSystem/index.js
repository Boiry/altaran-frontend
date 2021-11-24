import { connect } from 'react-redux';

import StarSystem from 'src/components/Map/StarSystem';

import {
  updateCoordinatesField,
  fetchStarSystem,
  fetchRegions,
  fetchSectors,
  fetchStarSystems,
  saveCurrentRegion,
  saveCurrentSector,
  saveCurrentStarSystem,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  region: state.map.region,
  sector: state.map.sector,
  starSystem: state.map.starSystem,
  starSystemName: state.map.starSystemInfo.name,
  regionsInfo: state.map.regionsInfo,
  sectorsInfo: state.map.sectorsInfo,
  starSystemsInfo: state.map.starSystemsInfo,
  sectorsAreLoading: state.map.sectorsAreLoading,
  starSystemsAreLoading: state.map.starSystemsAreLoading,
  starSystemIsLoading: state.map.starSystemIsLoading,
  currentRegion: state.map.currentRegion,
  currentSector: state.map.currentSector,
  currentStarSystem: state.map.currentStarSystem,
  starSystemInfo: state.map.starSystemInfo,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateCoordinatesField(newValue, name));
  },
  fetchStarSystem: (region, sector, starSystem) => {
    dispatch(fetchStarSystem(region, sector, starSystem));
  },
  fetchRegions: () => {
    dispatch(fetchRegions());
  },
  fetchSectors: (region) => {
    dispatch(fetchSectors(region));
  },
  fetchStarSystems: (region, sector) => {
    dispatch(fetchStarSystems(region, sector));
  },
  setCurrentRegion: (region) => {
    dispatch(saveCurrentRegion(region));
  },
  setCurrentSector: (sector) => {
    dispatch(saveCurrentSector(sector));
  },
  setCurrentStarSystem: (starSystem) => {
    dispatch(saveCurrentStarSystem(starSystem));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StarSystem);
