import { connect } from 'react-redux';

import Chat from 'src/components/Communications/Chat';

import {
  webSocketConnect,
  changeChannel,
  updateFieldValue,
  sendMessage,
  searchUser,
  subscribe,
} from 'src/actions/chat';

const mapStateToProps = (state) => ({
  webSocketConnected: state.chat.webSocketConnected,
  fieldValue: state.chat.fieldValue,
  messageTyping: state.chat.messageTyping,
  chatContent: state.chat.chatContent,
  channels: state.chat.channels,
  selectedChannel: state.chat.channel,
  searchUserValue: state.chat.searchUser,
  searchUserResult: state.chat.searchUserResult,
  userId: state.user.id,
  userName: state.user.username,
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
  sendMessage: (action, payload) => {
    dispatch(sendMessage(action, payload));
  },
  searchUser: (value) => {
    dispatch(searchUser(value));
  },
  subscribe: (userId, userName, createChannel) => {
    dispatch(subscribe(userId, userName, createChannel));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
