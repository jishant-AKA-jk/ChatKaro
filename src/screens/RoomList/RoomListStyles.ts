import {StyleSheet} from 'react-native';
import {ITheme} from '../../theme/Theme';
import {appSpacing, CStyles} from '../../theme/CStyles';
import {groupStyles} from '../../utils/appfunctions';

export const roomListStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 36,
      backgroundColor: theme.base_secondary,
    },
    header: groupStyles(
      CStyles.paddingHorizontalBase,
      CStyles.paddingVerticalXSm,
      {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.base_primary,
      },
    ),
    headerIcon: groupStyles(CStyles.flexRow, {
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 16,
    }),
    chat: {fontWeight: 'bold', fontSize: 16, fontStyle: 'italic'},
    karo: {fontWeight: 'bold', fontSize: 24, fontStyle: 'italic'},
    sectionHeader: groupStyles(CStyles.marginTopSm, {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: appSpacing.md,
      borderTopColor: theme.border_blur,
      columnGap: appSpacing.sm,
    }),
    seeAllText: {
      color: theme.primary,
    },
    chatRoomsContainer: {
      minHeight: '80%',
      justifyContent: 'center',
      paddingBottom: appSpacing.xl,
    },
    addRoomButton: groupStyles(CStyles.cetered, {
      width: 56,
      height: 56,
      position: 'absolute',
      bottom: 48,
      right: 24,
      backgroundColor: theme.button,
      borderWidth: 1,
      borderColor: theme.border_blur,
      borderRadius: appSpacing.md,
      elevation: 10,
      zIndex: 1,
    }),
    chatRoomCard: groupStyles(
      CStyles.marginVerticalSm,
      CStyles.borderRadiusMd,
      CStyles.paddingHorizontalBase,
      CStyles.paddingVerticalMd,
      {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.base_primary,
      },
    ),
    avatar: groupStyles(CStyles.borderRadiusMd, {
      width: 56,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: appSpacing.md,
    }),
    avatarText: {
      color: '#e2e2e2',
      fontWeight: 'bold',
      fontSize: 22,
    },
    chatRoomDetails: {
      flex: 1,
    },
    noChatAvilable: groupStyles(CStyles.cetered, {
      marginTop: '40%',
      rowGap: appSpacing.base,
    }),
    noChatJoinButton: {
      maxWidth: '50%',
      backgroundColor: theme.primary,
    },
    dateContainer: {},
  });
