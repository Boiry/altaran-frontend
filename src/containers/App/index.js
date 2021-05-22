import { connect } from 'react-redux';

import App from 'src/components/App';

const mapStateToProps = (state) => ({
  page: state.router.page,
  isLogged: state.user.isLogged,
  miniChat: state.miniChat.isOpened,
});

export default connect(
  mapStateToProps,
)(App);
