import {StyleSheet} from 'react-native';
import {ITheme} from '../../theme/Theme';
import {appSpacing, CStyles} from '../../theme/CStyles';
import {groupStyles} from '../../utils/appfunctions';

export const signinStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base_secondary,
      alignItems: 'center',
      rowGap: appSpacing.xl,
      padding: appSpacing.base * 2,
      justifyContent: 'center',
    },
    tagline: {
      width: '60%',
      lineHeight: 24,
      textAlignVertical: 'center',
      textAlign: 'center',
    },
    input: {width: '100%', rowGap: 4},
    social: groupStyles(
      {
        marginTop: appSpacing.xl,
        flex: 1,
        rowGap: appSpacing.base,
      },
      CStyles.alignItemsCenter,
    ),
  });
