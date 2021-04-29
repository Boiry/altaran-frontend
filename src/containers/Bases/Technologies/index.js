import { connect } from 'react-redux';

import Technologies from 'src/components/Bases/Technologies';

import { fetchTechnologies, changeCurrentTechnology, fetchTechnologiesUpdates } from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    technologies: state.bases[`${selectedBase}Technologies`],
    currentTechnology: state.bases[`${selectedBase}CurrentTechnology`],
    updates: state.bases[`${selectedBase}TechnologiesUpdates`],
})};

const mapDispatchToProps = (dispatch) => ({
  launchFetchTechnologies: () => {
    dispatch(fetchTechnologies());
  },
  changeTechnology: (name, item) => {
    dispatch(changeCurrentTechnology(name, item));
  },
  launchFetchTechnologiesUpdates: () => {
    dispatch(fetchTechnologiesUpdates());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Technologies);
