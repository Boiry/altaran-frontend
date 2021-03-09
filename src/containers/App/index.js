import { connect } from 'react-redux';

import App from 'src/components/App';

const mapStateToProps = (state) => ({
  page: state.router.page,
});

export default connect(
  mapStateToProps
)(App);
