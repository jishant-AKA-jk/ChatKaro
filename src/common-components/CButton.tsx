import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ButtonProps,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import CText from './CText';
import {TEXT_TYPE} from '../utils/Enums';
import {useStyles, useTheme} from '../context/ThemeContext';
import {groupStyles, hexToRgba} from '../utils/appfunctions';
import {ITheme} from '../theme/Theme';
import {appSpacing, CStyles} from '../theme/CStyles';

interface CustomButtonProps extends ButtonProps {
  buttonStyle?: ViewStyle | object;
  textStyle?: TextStyle;
  title: string;
  activeOpacity?: number;
  loading?: boolean;
}

export default function CButton({
  buttonStyle,
  textStyle,
  title,
  activeOpacity,
  loading = false,
  ...inputPorps
}: CustomButtonProps) {
  const {theme} = useTheme();
  const st = useStyles(styles);
  return (
    <TouchableOpacity
      style={[
        st.button,

        {
          backgroundColor: inputPorps.disabled
            ? hexToRgba(theme.button as string, 0.4)
            : theme.button,
        },
        buttonStyle,
      ]}
      {...inputPorps}
      activeOpacity={0.5}>
      {!loading ? (
        <CText
          textType={TEXT_TYPE.PrimaryText}
          style={[
            st.text,
            {
              color: inputPorps.disabled
                ? theme.text_secondary
                : theme.text_on_primary,
            },
            textStyle ?? {},
          ]}>
          {title}
        </CText>
      ) : (
        <ActivityIndicator color={theme.text_on_primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = (theme: ITheme) =>
  StyleSheet.create({
    button: groupStyles({
      width: '100%',
      height: 52,
      borderRadius: appSpacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.button,
    }),
    text: {
      fontWeight: '800',
    },
  });
