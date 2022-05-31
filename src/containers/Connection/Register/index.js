import { connect } from 'react-redux';

import Register from 'src/components/Connection/Register';

import { goToCivilizationsGuide, updateUserField, register, deleteUserMessages } from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
  civilization: state.user.civilization,
  email: state.user.email,
  password: state.user.password,
  matchingPassword: state.user.matchingPassword,
  usernameErrorMessage: state.user.usernameErrorMessage,
  passwordErrorMessage: state.user.passwordErrorMessage,
  registerSuccess: state.user.registerSuccess,
  waiting: state.user.isWaiting,
});

const mapDispatchToProps = (dispatch) => ({
  goToCivilizationsGuide: (value) => {
    dispatch(goToCivilizationsGuide(value));
  },
  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    dispatch(register());
  },
  deleteUserMessages: () => {
    dispatch(deleteUserMessages());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
