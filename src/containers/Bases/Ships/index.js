import { connect } from 'react-redux';

import Ships from 'src/components/Bases/Ships';

import {
  getShips,
  updateShipsBookmarks,
  dispatchBookmarks,
  getResources,
  sendShips,
} from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    ships: state.bases[selectedBase].ships,
    resources: state.bases[selectedBase].snapshotResources,
  });
};

const mapDispatchToProps = (dispatch) => ({
  getShips: (baseId) => {
    dispatch(getShips(baseId));
  },
  updateShipsBookmarks: (selectedBase, newBookmarkedShips) => {
    dispatch(updateShipsBookmarks(selectedBase, newBookmarkedShips));
  },
  dispatchBookmarks: (bookmarks) => {
    dispatch(dispatchBookmarks(bookmarks));
  },
  getResources: (selectedBase, boolean) => {
    dispatch(getResources(selectedBase, boolean));
  },
  send: (ships) => {
    dispatch(sendShips(ships));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ships);
