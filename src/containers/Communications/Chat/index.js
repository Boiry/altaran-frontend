import { connect } from 'react-redux';

import Chat from 'src/components/Communications/Chat';

import { webSocketConnect } from 'src/actions/chat';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  webSocketConnect: () => {
    dispatch(webSocketConnect());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
