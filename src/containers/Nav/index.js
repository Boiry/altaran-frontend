import { connect } from 'react-redux';

import Nav from 'src/components/Nav';

import { logout } from 'src/actions/user';

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Nav);
