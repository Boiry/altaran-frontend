import { connect } from 'react-redux';

import Aside from 'src/components/Bases/Aside';

import { fetchBaseResources, getResources, setResources } from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    baseResources: state.bases[selectedBase].resources,
    needResources: state.bases[selectedBase].needResources,
  })
};

const mapDispatchToProps = (dispatch) => ({
  fetchBaseResources: () => {
    dispatch(fetchBaseResources());
  },
  getResources: (selectedBase, boolean) => {
    dispatch(getResources(selectedBase, boolean));
  },
  setResources: (selectedBase, resources) => {
    dispatch(setResources(selectedBase, resources));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
