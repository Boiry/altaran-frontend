import { connect } from 'react-redux';

import Chat from 'src/components/Communications/Chat';

import { webSocketConnect, updateFieldValue, sendMessage } from 'src/actions/chat';

const mapStateToProps = (state) => ({
  fieldValue: state.chat.fieldValue,
  chatContent: state.chat.chatContent,
});

const mapDispatchToProps = (dispatch) => ({
  webSocketConnect: () => {
    dispatch(webSocketConnect());
  },
  updateFieldValue: (value) => {
    dispatch(updateFieldValue(value));
  },
  sendMessage: () => {
    dispatch(sendMessage());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
