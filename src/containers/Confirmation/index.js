import { connect } from 'react-redux';

import Confirmation from 'src/components/Confirmation';

import { confirm } from 'src/actions/user';

const mapStateToProps = (state) => ({
  confirmSuccess: state.user.confirmSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  confirm: (token) => {
    dispatch(confirm(token));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirmation);
