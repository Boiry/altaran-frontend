import React, { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { useTranslation } from 'react-i18next';

import Message from './Message';
import './chat.scss';

import Corner from 'src/assets/images/corner.svg';

const Chat = ({
  webSocketConnect,
  webSocketConnected,
  changeChannel,
  updateFieldValue,
  messageTyping,
  fieldValue,
  sendMessage,
  chatContent,
  channels,
  selectedChannel,
  searchUser,
  searchUserValue,
  searchUserResult,
  subscribe,
  userId,
  userName,
}) => {
  const { t } = useTranslation('chat');
  const messages = useRef();
  const typing = useRef();

  // WebSocket Connection
  useEffect(() => {
    if (!webSocketConnected) {
      webSocketConnect();
    }
  }, []);
  
  // Initialization
  useEffect(() => {
    field.current.focus();
    const elements = document.getElementsByClassName('chat-channels-channel');
    for (let i=0; i<elements.length; i++) {
      if (elements[i].getAttribute('name') === selectedChannel.name) {
        elements[i].classList.add('chat-channels-channel-active');
      }
    }
  }, []);

  // Handle the change of channel
  const clickOnChannel = (channel) => {
    changeChannel(channel);
    const elements = document.getElementsByClassName('chat-channels-channel');
    for (let i=0; i<elements.length; i++) {
      if (elements[i].classList.contains('chat-channels-channel-active')) {
        elements[i].classList.remove('chat-channels-channel-active');
      }
      if (elements[i].getAttribute('name') === channel.name) {
        elements[i].classList.add('chat-channels-channel-active');
      }
    }
  }

  // Handle the typing in input
  let [timeout, set] = useState();
  const changeFieldValue = (e) => {
    updateFieldValue(e.target.value);
    set(clearTimeout(timeout));
    set(timeout = setTimeout(() => sendMessage("STOPTYPING"), 2000));
    sendMessage("TYPING");
  }

  // Displaying who's typing
  useEffect(() => {
    if (messageTyping.length > 0) {
      let message = '';
      if (messageTyping.length === 1) {
        message = `${messageTyping[0]} est en train d'écrire...`;
      } else {
        for (let i=0; i<messageTyping.length; i++) {
          message += messageTyping[i];
          if (i !== messageTyping.length -1) {
            message += ', ';
          } else {
            message += " sont en train d'écrire...";
          }
        }
      }
      typing.current.textContent = message;
    } else {
      typing.current.textContent = "";
    }
  }, [messageTyping])

  // Handle the submit button
  const submitMessage = (e) => {
    e.preventDefault();
    if (fieldValue) {
      sendMessage("SEND");
      setReady(false);
    }
  }
  
  // Deals with name and date to display or not
  // Don't ask me for the useState, it works, that's it
  const [isReady, setReady] = useState();
  useEffect(() => {
    if (chatContent.length > 1) {
      const currentMessage = chatContent[chatContent.length-1];
      const lastMessage = chatContent[chatContent.length-2];
      const offsetDate = currentMessage.date - lastMessage.date;
      if (currentMessage.author === lastMessage.author && offsetDate < 600000) {
        currentMessage.hide = true;
      } else {
        currentMessage.hide = false;
      }
      setReady(true);
    } else if (chatContent.length === 1) {
      chatContent[0].hide = false;
    }
  }, [chatContent])
  
  // Handle the opening and closing of the emoticons picker
  const [status, setStatus] = useState("closed");
  const openPicker = () => {
    if (status === "closed") {
      document.getElementsByClassName("emoji-picker-react")[0].style.visibility = "visible";
      setStatus("opened");
    } else {
      document.getElementsByClassName("emoji-picker-react")[0].style.visibility = "hidden";
      setStatus("closed");
    }
  }

  // Emoticons picker settings
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const pickerStyle = {"position": "absolute", "right": "1rem", "top": "calc(100% - 320px - 7rem)"};
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    document.getElementsByClassName("emoji-picker-react")[0].style.visibility = "hidden";
    setStatus("closed");
    field.current.focus();
  };

  // i18n for Emoji Picker
  const groupNames = {
    smileys_people: t("smileys_people"),
    animals_nature: t("animals_nature"),
    food_drink: t("food_drink"),
    travel_places: t("travel_places"),
    activities: t("activities"),
    objects: t("objects"),
    symbols: t("symbols"),
    flags: t("flags"),
    recently_used: t("recently_used")
  };

  // Includes the emoticon at the cursor position
  const field = useRef();
  useEffect(() => {
    if (chosenEmoji) {
      const fieldArray = fieldValue.split('');
      const position = field.current.selectionStart;
      fieldArray.splice(position, 0, chosenEmoji.emoji)
      const newFieldContent = fieldArray.join('');
      updateFieldValue(newFieldContent);
      setChosenEmoji(null);
    }
  })

  // Scroll to bottom when new message appears
  useEffect(() => {
    messages.current.scrollTop = messages.current.scrollHeight;
  }, [chatContent]);

  // When typing in search for users input
  const inputSearchUser = (e) => {
    searchUser(e.target.value);
  }

  const clickOnUser = (id, username) => {
    subscribe(id, username, true);
    sendMessage("JOIN", [userId, userName]);
    searchUser('');
  }

  const searchResult = useRef();
  useEffect(() => {
    while (searchResult.current.firstChild) {
      searchResult.current.removeChild(searchResult.current.firstChild);
    }
    if (searchUserResult) {
      searchUserResult.forEach(result => {
        const newDiv = document.createElement("div");
        const text = document.createTextNode(result.username);
        newDiv.appendChild(text);
        newDiv.setAttribute('class', 'chat-channels-search-result-item');
        newDiv.onclick = () => clickOnUser(result.id, result.username);
        searchResult.current.appendChild(newDiv);
      })
    }
  })

  return (
    <>
      <main className="chat">
        <div ref={messages} className="chat-messages">
          {chatContent.map((message) => (
            <Message
              key={message.key}
              author={message.author}
              date={message.date}
              content={message.content}
              hide={message.hide}
            />
          ))}
        </div>
        <form className="chat-messages-form" onSubmit={submitMessage}>
          <input ref={field} className="chat-messages-field" onChange={changeFieldValue} value={fieldValue} />
          <div className="chat-messages-emoticons" onClick={() => (openPicker())}>&#128512;</div>
        </form>
        <Picker groupNames={groupNames} className="chat-messages-picker" native="true" pickerStyle={pickerStyle} onEmojiClick={onEmojiClick} />
        <div ref={typing} className="chat-messages-typing"></div>
        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </main>

      <aside className="chat-channels">
        {channels.map((channel, index) => {
          if (channel.path === "main" || channel.path === "help") {
            return <div key={`channel.path${index}`} className="chat-channels-channel chat-channels-public-channel" name={channel.name} onClick={() => clickOnChannel(channel)}>{t(channel.name)}</div>

          } else if (channel.path === "alliance") {
            return (
              <React.Fragment key="fragment">
                <div key={`channel.path${index}`} className="chat-channels-channel chat-channels-public-channel" name={channel.name} onClick={() => clickOnChannel(channel)}>{t(channel.name)}</div>
                <hr key="hr" />
                <input key="searchInput" className="chat-channels-search" placeholder="Rechercher" value={searchUserValue} onChange={inputSearchUser}></input>
                <div ref={searchResult} key="searchUserResult" className="chat-channels-search-result"></div>
              </React.Fragment>
            )
          } else {
            return <div key={`channel.path${index}`} className="chat-channels-channel chat-channels-private-channel" name={channel.name} onClick={() => clickOnChannel(channel)}>{channel.name}</div>
          }
        })}

        <img src={Corner} className="corner corner-top-left" />
        <img src={Corner} className="corner corner-top-right" />
        <img src={Corner} className="corner corner-bottom-left" />
        <img src={Corner} className="corner corner-bottom-right" />
      </aside>
    </>
  );
};

export default Chat;
