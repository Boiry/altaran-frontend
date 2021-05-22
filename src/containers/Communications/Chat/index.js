import { connect } from 'react-redux';

import Chat from 'src/components/Communications/Chat';

import {
  webSocketConnect,
  changeChannel,
  updateFieldValue,
  sendMessage,
} from 'src/actions/chat';

const mapStateToProps = (state) => ({
  webSocketConnected: state.chat.webSocketConnected,
  fieldValue: state.chat.fieldValue,
  messageTyping: state.chat.messageTyping,
  chatContent: state.chat.chatContent,
  channels: state.chat.channels,
  selectedChannel: state.chat.channel,
});

const mapDispatchToProps = (dispatch) => ({
  webSocketConnect: () => {
    dispatch(webSocketConnect());
  },
  changeChannel: (channel) => {
    dispatch(changeChannel(channel));
  },
  updateFieldValue: (value) => {
    dispatch(updateFieldValue(value));
  },
  sendMessage: (action) => {
    dispatch(sendMessage(action));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
