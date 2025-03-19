import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useAuth} from '../../context/AuthContext';
import {IChat, IChatLog, IChatMessage} from './ChatRoomController';
import CText from '../../common-components/CText';
import {SOCKET_EVENTS, TEXT_TYPE} from '../../utils/Enums';
import {useStyles} from '../../context/ThemeContext';
import {ChatRoomStyles} from './ChatRoomStyles';
import {chatDateTime} from '../../utils/appfunctions';

export default function ChatMessages({item}: any) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const {userInfo} = useAuth();
  const st = useStyles(ChatRoomStyles);

  const handleTextLayout = (event: any) => {
    const {height} = event.nativeEvent.layout;
    const lineHeight = 21;
    const numberOfLines = height / lineHeight;

    setShowReadMore(numberOfLines > 5);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const isCurrentUser = item.username === userInfo?.username;
  if (!item?.content) {
    return (
      <View style={[st.messageContainer, st.userActivityMessageContainer]}>
        {item?.message ? (
          <CText textType={TEXT_TYPE.SecondaryText}>{item?.message}</CText>
        ) : (
          <CText textType={TEXT_TYPE.SecondaryText}>{`${
            item?.username === userInfo?.username ? 'You' : item?.username
          } ${
            item?.event === SOCKET_EVENTS.JOIN ? 'joined' : 'left'
          } the chat.`}</CText>
        )}
      </View>
    );
  }
  return (
    <View
      style={[
        st.messageContainer,
        isCurrentUser
          ? st.currentUserMessageContainer
          : st.otherUserMessageContainer,
      ]}>
      <View
        style={[
          st.messageBubble,
          isCurrentUser ? st.currentUserBubble : st.otherUserBubble,
        ]}>
        {!isCurrentUser && (
          <CText
            textType={TEXT_TYPE.SecondaryText}
            numberOfLines={1}
            style={st.userName}>
            {item?.username}
          </CText>
        )}
        <CText
          style={st.messageText}
          onLayout={handleTextLayout}
          numberOfLines={showFullDescription ? undefined : 5}>
          {item.content}
        </CText>
        <TouchableOpacity onPress={toggleDescription}>
          {showReadMore && (
            <CText style={st.readMoreText}>
              {showFullDescription ? 'Read Less' : 'Read More'}
            </CText>
          )}
        </TouchableOpacity>
        <CText textType={TEXT_TYPE.SecondaryText} style={st.timestamp}>
          {chatDateTime(item.created_at)}
        </CText>
      </View>
    </View>
  );
}
