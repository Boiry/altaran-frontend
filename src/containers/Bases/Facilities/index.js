import { connect } from 'react-redux';

import Facilities from 'src/components/Bases/Facilities';

import { fetchFacilities, changeCurrentFacility, fetchFacilitiesUpdates } from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    facilities: state.bases[`${selectedBase}Facilities`],
    currentFacility: state.bases[`${selectedBase}CurrentFacility`],
    updates: state.bases[`${selectedBase}FacilitiesUpdates`],
})};

const mapDispatchToProps = (dispatch) => ({
  launchFetchFacilities: () => {
    dispatch(fetchFacilities());
  },
  launchFetchFacilitiesUpdates: () => {
    dispatch(fetchFacilitiesUpdates());
  },
  changeFacility: (name, item) => {
    dispatch(changeCurrentFacility(name, item));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Facilities);
