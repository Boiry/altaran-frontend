import { connect } from 'react-redux';

import Aside from 'src/components/Bases/Aside';

import { fetchBaseInfos, setResourceAmount } from 'src/actions/bases';

const mapStateToProps = (state) => {
  const selectedBase = state.bases.selectedBase;
  return ({
    selectedBase,
    infos: state.bases[`${selectedBase}Infos`],
  })
};

const mapDispatchToProps = (dispatch) => ({
  launchFetchBaseInfos: () => {
    dispatch(fetchBaseInfos());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
