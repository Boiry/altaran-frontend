import { connect } from 'react-redux';

import App from 'src/components/App';

const mapStateToProps = (state) => ({
  page: state.router.page,
  isLogged: state.user.isLogged,
});

export default connect(
  mapStateToProps,
)(App);
