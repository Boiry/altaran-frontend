import { connect } from 'react-redux';

import StarSystem from 'src/components/Map/StarSystem';

import { UpdateCoordinatesField } from 'src/actions/map';

const mapStateToProps = (state) => ({
  region: state.map.region,
  sector: state.map.sector,
  starSystem: state.map.starSystem,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateCoordinatesField(newValue, name));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StarSystem);
