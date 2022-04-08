import { connect } from 'react-redux';

import ResetPassword from 'src/components/Connection/ResetPassword';

import { resetPassword } from 'src/actions/user';

const mapStateToProps = (state) => ({
  waiting: state.user.isWaiting,
  success: state.user.resetPasswordSuccess,
  errorMessage: state.user.resetPasswordError,
});

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (newPassword, newMatchingPassword) => {
    dispatch(resetPassword(newPassword, newMatchingPassword));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
