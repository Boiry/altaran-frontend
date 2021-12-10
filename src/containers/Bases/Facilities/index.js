import { connect } from 'react-redux';

import Facilities from 'src/components/Bases/Facilities';

import {
  fetchFacilitiesLevels,
  fetchCurrentFacility,
  changeCurrentFacility,
  fetchFacilitiesUpgrades,
  addFacilityUpgrade,
  removeFacilityUpgrade,
} from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    baseId: state.bases[selectedBase].infos.id,
    facilitiesLevels: state.bases[selectedBase].levels,
    currentFacility: state.bases[selectedBase].currentFacility,
    nextLevelCost: state.bases[selectedBase].nextLevelCost,
    upgrades: state.bases[selectedBase].upgrades,
    loading: state.bases.loading,
})};

const mapDispatchToProps = (dispatch) => ({
  fetchFacilitiesLevels: () => {
    dispatch(fetchFacilitiesLevels());
  },
  fetchCurrentFacility: (base, baseId, facility) => {
    dispatch(fetchCurrentFacility(base, baseId, facility));
  },
  fetchFacilitiesUpgrades: (baseId) => {
    dispatch(fetchFacilitiesUpgrades(baseId));
  },
  addFacilityUpgrade: (baseId, facility) => {
    dispatch(addFacilityUpgrade(baseId, facility));
  },
  removeFacilityUpgrade: (baseId, facility) => {
    dispatch(removeFacilityUpgrade(baseId, facility));
  },
  changeFacility: (base, facility) => {
    dispatch(changeCurrentFacility(base, facility));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Facilities);
