import { connect } from 'react-redux';

import Login from 'src/components/Login';

import { updateUserField, login } from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
  password: state.user.password,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updateUserField(newValue, name));
  },
  handleLogin: () => {
    dispatch(login());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
