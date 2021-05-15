import { connect } from 'react-redux';

import Galaxy from 'src/components/Map/Galaxy';

import {
  updateCoordinatesField,
  fetchStarSystem,
  deleteStarSystemName,
  setCameraPosition,
} from 'src/actions/map';

import { changeSubPage } from 'src/actions/tab';

const mapStateToProps = (state) => ({
  starSystemName: state.map.starSystemInfo.name,
  getCameraPosition: state.map.cameraPosition,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Galaxy);
