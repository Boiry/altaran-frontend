import { connect } from 'react-redux';

import Loader from 'src/components/Loader';

import { webSocketConnect } from 'src/actions/chat';
import { fetchBases } from 'src/actions/bases';
import { saveUserInfo } from 'src/actions/user';

const mapStateToProps = (state) => ({
  webSocketConnected: state.chat.webSocketConnected,
  id: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  webSocketConnect: () => {
    dispatch(webSocketConnect());
  },
  fetchBases: () => {
    dispatch(fetchBases());
  },
  setIsLogged: (id, value) => {
    dispatch(saveUserInfo(id, value));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Loader);
