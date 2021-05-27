import { connect } from 'react-redux';

import Galaxy from 'src/components/Map/Galaxy';

import {
  updateCoordinatesField,
  fetchStarSystem,
  deleteStarSystemName,
  setCameraPosition,
  goAndSee,
} from 'src/actions/map';

import { changeSubPage } from 'src/actions/tab';

const mapStateToProps = (state) => ({
  starSystemName: state.map.starSystemInfo.name,
  getCameraPosition: state.map.cameraPosition,
  galaxySelector: state.map.galaxySelector,
  galaxyRegion: state.map.galaxyRegion,
  galaxySector: state.map.galaxySector,
  galaxyStarSystem: state.map.galaxyStarSystem,
  highlight: state.map.highlight,
  isolate: state.map.isolate,
  goAndSee: state.map.goAndSee,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateCoordinatesField(newValue, name));
  },
  launchFetchStarSystem: (region, sector, starSystem) => {
    dispatch(fetchStarSystem(region, sector, starSystem));
  },
  goToStarSystemPage: () => {
    dispatch(changeSubPage('map', 'starSystem'));
  },
  launchDeleteStarSystemName: () => {
    dispatch(deleteStarSystemName());
  },
  setCameraPosition: (position) => {
    dispatch(setCameraPosition(position));
  },
  setGoAndSee: (value) => {
    dispatch(goAndSee(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Galaxy);
