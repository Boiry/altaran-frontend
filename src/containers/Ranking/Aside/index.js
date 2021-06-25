import { connect } from 'react-redux';

import Aside from 'src/components/Empire/Ranking/Aside';

import { fetchPersonalRanking } from 'src/actions/ranking';

const mapStateToProps = (state) => ({
  ranking: state.ranking.personalRanking,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInfos: () => {
    dispatch(fetchPersonalRanking())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Aside);
