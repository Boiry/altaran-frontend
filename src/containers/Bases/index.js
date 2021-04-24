import { connect } from 'react-redux';

import Bases from 'src/components/Bases';

import { updateSelectedBase } from 'src/actions/bases';

const mapStateToProps = (state) => ({
  selectedBase: state.bases.selectedBase,
});

const mapDispatchToProps = (dispatch) => ({
  changeSelectedBase: (SelectedBase) => {
    dispatch(updateSelectedBase(SelectedBase));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bases);
