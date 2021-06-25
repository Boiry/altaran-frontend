import { connect } from 'react-redux';

import Ranking from 'src/components/Empire/Ranking';

import { fetchRanking, fetchPlayers } from 'src/actions/ranking';

const mapStateToProps = (state) => ({
  ranking: state.ranking.ranking,
  nbPlayers: state.ranking.nbPlayers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchInfos: (category1, category2) => {
    dispatch(fetchRanking(category1, category2))
  },
  fetchPlayers: () => {
    dispatch(fetchPlayers())
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ranking);
