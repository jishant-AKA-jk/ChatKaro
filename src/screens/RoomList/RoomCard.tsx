import {View, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import {IChatRoom} from './RoomList';
import {
  getFormattedDate,
  getInitials,
  getRandomColor,
} from '../../utils/appfunctions';
import {useStyles, useTheme} from '../../context/ThemeContext';
import {roomListStyles} from './RoomListStyles';
import CText from '../../common-components/CText';
import {SVG_ICONS, TEXT_TYPE} from '../../utils/Enums';
import CSvgIcons from '../../common-components/CSvgIcons';

const RoomCard = ({
  item,
  index,
  handleChatRoomPress,
}: {
  item: IChatRoom;
  index: number;
  handleChatRoomPress: (chatroom: IChatRoom) => void;
}) => {
  const initials = getInitials(item.name);
  const avatarColor = getRandomColor(index);
  const st = useStyles(roomListStyles);
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleChatRoomPress(item)}
      style={st.chatRoomCard}>
      <View style={[st.avatar, {backgroundColor: avatarColor}]}>
        <CText style={st.avatarText}>{initials}</CText>
      </View>
      <View style={st.chatRoomDetails}>
        <CText textType={TEXT_TYPE.SectionTitle} numberOfLines={1}>
          {item.name}
        </CText>
        <View style={st.dateContainer}>
          {item.created_at && (
            <CText textType={TEXT_TYPE.SecondaryText} style={st.dateText}>
              Created: {getFormattedDate(item?.created_at)}
            </CText>
          )}
          {item.expires_at && (
            <CText textType={TEXT_TYPE.SecondaryText} style={st.dateText}>
              Expires On: {getFormattedDate(item?.expires_at)}
            </CText>
          )}
        </View>
      </View>
      <View>
        <CSvgIcons name={SVG_ICONS.JoinIcon} size={30} color={theme.primary} />
      </View>
    </TouchableOpacity>
  );
};

export default memo(RoomCard);
