import {StyleSheet} from 'react-native';
import {ITheme} from '../../theme/Theme';
import {appSpacing, CStyles} from '../../theme/CStyles';
import {groupStyles} from '../../utils/appfunctions';

export const ChatRoomStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base_secondary,
    },
    readMoreText: {
      color: theme.text_secondary,
      fontWeight: 'bold',
    },
    headers: groupStyles(CStyles.paddingBase, {
      backgroundColor: theme.base_primary,
      flexDirection: 'row',
    }),
    messageContainer: {
      flexDirection: 'row',
      marginBottom: appSpacing.md,
    },
    userActivityMessageContainer: {
      alignSelf: 'center',
      padding: 2,
      paddingHorizontal: appSpacing.sm,
      borderRadius: appSpacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.base_primary,
    },
    currentUserMessageContainer: {
      alignSelf: 'flex-end',
    },
    otherUserMessageContainer: {
      alignSelf: 'flex-start',
    },
    messageBubble: {
      borderRadius: appSpacing.md,
      paddingVertical: appSpacing.xsm,
      paddingHorizontal: appSpacing.sm,
      maxWidth: '84%',
    },
    currentUserBubble: {
      backgroundColor: theme.primary,
      borderBottomRightRadius: 0,
    },
    otherUserBubble: {
      backgroundColor: theme.base_primary,
      borderBottomLeftRadius: 0,
    },
    userName: {
      color: theme.text_secondary,
      fontSize: 10,
    },
    messageText: {
      color: theme.text_primary,
    },
    timestamp: {
      fontSize: 10,
      alignSelf: 'flex-end',
      color: theme.text_secondary,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: appSpacing.sm,
      paddingVertical: appSpacing.md,
      borderTopColor: theme.border_blur,
      backgroundColor: theme.base_secondary,
      columnGap: appSpacing.sm,
    },
    textInput: {
      flex: 1,
      borderWidth: 1,
      color: theme.text_primary,
      borderColor: theme.border_blur,
      borderRadius: appSpacing.md,
      padding: appSpacing.sm,
      paddingHorizontal: appSpacing.md,
      height: 40,
      width: '80%',
      backgroundColor: theme.base_primary,
    },
    sendButton: {
      padding: appSpacing.sm,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: appSpacing.md,
      backgroundColor: theme.primary,
    },
    noChatView: {
      alignItems: 'center',
      flex: 1,
    },
  });
