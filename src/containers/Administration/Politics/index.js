import { connect } from 'react-redux';

import Politics from 'src/components/Administration/Politics';

import { fetchPolitics } from 'src/actions/administration';

const mapStateToProps = (state) => ({
  politics: state.administration.politics,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPolitics: () => {
    dispatch(fetchPolitics());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Politics);
