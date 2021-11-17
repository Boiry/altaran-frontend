import { connect } from 'react-redux';

import Aside from 'src/components/Bases/Aside';

import { fetchBaseResources } from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    baseResources: state.bases[selectedBase].resources,
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchBaseResources: () => {
    dispatch(fetchBaseResources());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
