import { connect } from 'react-redux';

import MiniChat from 'src/components/MiniChat';

import { setTab, isOpened } from 'src/actions/miniChat';
import { changeChannel, updateFieldValue, sendMessage } from 'src/actions/chat';

const mapStateToProps = (state) => ({
  channels: state.chat.channels,
  selectedChannel: state.chat.channel.name,
  fieldValue: state.chat.fieldValue,
  chatContent: state.chat.chatContent,
});

const mapDispatchToProps = (dispatch) => ({
  setTab: () => {
    dispatch(setTab());
  },
  closeMiniChat: () => {
    dispatch(isOpened(false));
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
)(MiniChat);
