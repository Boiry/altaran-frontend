import { connect } from 'react-redux';

import Aside from 'src/components/Map/Galaxy/Aside';

import {
  setGalaxySelector,
  changeGalaxyField,
  fetchRegions,
  fetchSectors,
  fetchStarSystems,
  setHighlight,
  setIsolate,
  goAndSee,
} from 'src/actions/map';

const mapStateToProps = (state) => ({
  galaxySelector: state.map.galaxySelector,
  galaxyRegion: state.map.galaxyRegion,
  galaxySector: state.map.galaxySector,
  galaxyStarSystem: state.map.galaxyStarSystem,
  regionsInfo: state.map.regionsInfo,
  sectorsInfo: state.map.sectorsInfo,
  starSystemsInfo: state.map.starSystemsInfo,
  highlighted: state.map.highlight,
  isolated: state.map.isolate,
});

const mapDispatchToProps = (dispatch) => ({
  setGalaxySelector: (selected) => {
    dispatch(setGalaxySelector(selected));
  },
  changeField: (newValue, name) => {
    dispatch(changeGalaxyField(newValue, name));
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
  highlight: (value) => {
    dispatch(setHighlight(value));
  },
  isolate: (value) => {
    dispatch(setIsolate(value));
  },
  goAndSee: (value) => {
    dispatch(goAndSee(value));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
