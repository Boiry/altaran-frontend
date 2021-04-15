import { connect } from 'react-redux';

import Register from 'src/components/Connection/Register';

import { updateUserField, register } from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
  password: state.user.password,
  matchingPassword: state.user.matchingPassword,
  usernameErrorMessage: state.user.usernameErrorMessage,
  passwordErrorMessage: state.user.passwordErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    dispatch(register());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
