import { connect } from 'react-redux';

import Home from 'src/components/Home';

const mapStateToProps = (state) => ({
  id: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
