import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {TEXT_TYPE} from '../utils/Enums';
import {useTheme} from '../context/ThemeContext';
import {ITheme} from '../theme/Theme';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
  textType?: TEXT_TYPE;
  isDisabled?: boolean;
}

const ICText: React.FC<CustomTextProps> = ({
  style,
  children,
  textType = TEXT_TYPE.PrimaryText,
  isDisabled = false,
  ...props
}) => {
  const {theme} = useTheme();
  return (
    <Text
      style={[
        typoTextStyle(theme).fonts,
        textType
          ? typoTextStyle(theme)[textType]
          : typoTextStyle(theme).primaryText,
        style,
        isDisabled ? typoTextStyle(theme).textDisabled : null,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

const typoTextStyle = (theme: ITheme) =>
  StyleSheet.create({
    fonts: {
      //   textTransform: 'capitalize',
    },
    pageTitle: {
      fontSize: 18,
      lineHeight: 27,
      fontWeight: '900',
      color: theme.text_primary,
    },
    sectionTitle: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '700',
      color: theme.text_primary,
    },
    primaryText: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      color: theme.text_primary,
    },
    secondaryText: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400',
      color: theme.text_primary,
    },
    errorText: {
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '600',
      color: theme.error,
    },
    textDisabled: {
      color: theme.text_secondary,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: '400',
    },
  });

export default ICText;
