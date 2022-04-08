import { connect } from 'react-redux';

import ForgottenPassword from 'src/components/Connection/ForgottenPassword';

import { forgottenPassword, deleteUserMessages } from 'src/actions/user';

const mapStateToProps = (state) => ({
  successMessage: state.user.forgottenPasswordSuccessMessage,
  errorMessage: state.user.forgottenPasswordErrorMessage,
  waiting: state.user.isWaiting,
});

const mapDispatchToProps = (dispatch) => ({
  forgottenPassword: (email) => {
    dispatch(forgottenPassword(email));
  },
  deleteUserMessages: () => {
    dispatch(deleteUserMessages());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgottenPassword);
