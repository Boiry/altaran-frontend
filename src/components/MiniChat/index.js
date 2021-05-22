import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { setPage } from 'src/utils/router';
import Message from './Message';

import Corner from 'src/assets/images/corner.svg';
import Open from 'src/assets/images/open.svg';

import './miniChat.scss';

const MiniChat = ({
  setTab,
  closeMiniChat,
  channels,
  changeChannel,
  selectedChannel,
  updateFieldValue,
  fieldValue,
  chatContent,
  sendMessage,
}) => {
  const { t } = useTranslation('chat');
  const miniChat = useRef();
  const content = useRef();
  const input = useRef();
  const sizing = useRef();
  const channelsWindow = useRef();

  // Menu: open and close the channels window
  const [opened, open] = useState(false);
  const openCloseChannelsWindow = () => {
    if (opened) {
      channelsWindow.current.style.display = 'none';
      open(false);
    } else {
      channelsWindow.current.style.display = 'block';
      open(true);
    }
  }

  // Menu: open chat page
  const goToPage = () => {
    setPage("communications");
    setTab();
  }

  // Menu: shrink and grow
  const [size, setSize] = useState("big");
  const changeSize = () => {
    if (size === "big") {
      miniChat.current.style.height = "2.5rem";
      content.current.style.display = "none";
      input.current.style.display = "none";
      sizing.current.style.transform = "rotate(180deg)";
      setSize("small")
    } else {
      miniChat.current.style.height = "45vh";
      content.current.style.display = "block";
      input.current.style.display = "block";
      sizing.current.style.transform = "rotate(0)";
      setSize("big")
    }
  }

  // Menu: close
  const close = () => {
    closeMiniChat();
  }

  const changeFieldValue = (e) => {
    updateFieldValue(e.target.value);
  }

  const submitMessage = (e) => {
    e.preventDefault();
    if (fieldValue) {
      sendMessage("SEND");
    }
  }

  // Scroll to bottom when new message appears
  useEffect(() => {
    content.current.scrollTop = content.current.scrollHeight;
  }, [chatContent]);

  return (
    <div ref={miniChat} className="minichat">
      <img src={Corner} className="corner corner-top-left" />
      <img src={Corner} className="corner corner-top-right" />
      <img src={Corner} className="corner corner-bottom-left" />
      <img src={Corner} className="corner corner-bottom-right" />

      <div className="minichat-menu">
        <div className="minichat-header">
          <div className="minichat-header-channel" onClick={() => openCloseChannelsWindow()}>{t(selectedChannel)}</div>
          <img src={Open} className="minichat-header-open" onClick={() => goToPage()} />
          <div ref={sizing} className="minichat-header-change-size" onClick={() => changeSize()}>▼</div>
          <div className="minichat-header-close" onClick={() => close()}>X</div>
        </div>
      </div>

      <div ref={content} className="minichat-content">
        {chatContent.map((message) => (
          <Message
            key={message.key}
            author={message.author}
            content={message.content}
          />
        ))}
      </div>

      <form onSubmit={submitMessage}>
        <input ref={input} className="minichat-field" type="text" onChange={changeFieldValue} value={fieldValue} />
      </form>

      <div ref={channelsWindow} className="minichat-channels-window">
        {channels.map((channel, index) => (
          <div key={`channelWindow${index}`} className="minichat-channels-window-item" onClick={() => {openCloseChannelsWindow(); changeChannel(channel)}}>{t(channel)}</div>
        ))}
      </div>
    </div>
  );
};

export default MiniChat;
