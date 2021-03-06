import { connect } from 'react-redux';

import Login from 'src/components/Connection/Login';

import { updateUserField, login, deleteUserMessages } from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password,
  errorMessage: state.user.loginErrorMessage,
  waiting: state.user.isWaiting,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    dispatch(login());
  },
  deleteUserMessages: () => {
    dispatch(deleteUserMessages());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
