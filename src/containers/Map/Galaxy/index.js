import { connect } from 'react-redux';

import Galaxy from 'src/components/Map/Galaxy';

import {
  updateCoordinatesField,
  fetchStarSystem,
  fetchRegions,
  fetchSectors,
  fetchStarSystems,
  saveCurrentRegion,
  saveCurrentSector,
  saveCurrentStarSystem,
  deleteStarSystemName,
} from 'src/actions/map';

import { changeSubPage } from 'src/actions/tab';

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
  currentRegion: state.map.currentRegion,
  currentSector: state.map.currentSector,
  currentStarSystem: state.map.currentStarSystem,
  starSystemInfo: state.map.starSystemInfo,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateCoordinatesField(newValue, name));
  },
  launchFetchStarSystem: (region, sector, starSystem) => {
    dispatch(fetchStarSystem(region, sector, starSystem));
  },
  launchFetchRegions: () => {
    dispatch(fetchRegions());
  },
  launchFetchSectors: (region) => {
    dispatch(fetchSectors(region));
  },
  launchFetchStarSystems: (region, sector) => {
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
  goToStarSystemPage: () => {
    dispatch(changeSubPage('map', 'starSystem'));
  },
  launchDeleteStarSystemName: () => {
    dispatch(deleteStarSystemName());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Galaxy);
