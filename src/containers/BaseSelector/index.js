import { connect } from 'react-redux';

import BaseSelector from 'src/components/Bases/BaseSelector';

import { updateSelectedBase } from 'src/actions/baseSelector';

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
)(BaseSelector);
