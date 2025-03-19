import {
  TextInput,
  TextInputProps,
  TextStyle,
  KeyboardTypeOptions,
  StyleSheet,
  StyleProp,
} from 'react-native';
import React, {RefObject, useState} from 'react';
import {useStyles, useTheme} from '../context/ThemeContext';
import {ITheme} from '../theme/Theme';
import {appSpacing} from '../theme/CStyles';

interface ICustomInputProps extends TextInputProps {
  value: string;
  inputStyle?: StyleProp<TextStyle>;
  placeholderText: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  ref?: RefObject<TextInput | null>;
  isInModal?: boolean;
}

const CTextInput: React.FC<ICustomInputProps> = ({
  value,
  inputStyle,
  placeholderText,
  onChangeText,
  keyboardType,
  ref,
  isInModal = false,
  ...inputPorps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {theme} = useTheme();
  const st = useStyles(textInputStyles);
  return (
    <TextInput
      {...inputPorps}
      style={[
        st.input,
        {
          borderColor: isFocused ? theme.border_focus : theme.border_blur,
        },
        !isInModal ? {flex: 1} : {width: '100%'},
        inputStyle,
      ]}
      value={value}
      onChangeText={(text: string) => {
        onChangeText && onChangeText(text);
      }}
      cursorColor={isFocused ? theme.info : theme.border_focus}
      keyboardType={keyboardType}
      ref={ref}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      placeholder={placeholderText ?? ''}
    />
  );
};

export default CTextInput;

const textInputStyles = (theme: ITheme) =>
  StyleSheet.create({
    input: {
      //   flex: 1,
      height: 40,
      color: theme.text_primary,
      backgroundColor: theme.base_primary,
      borderWidth: 1.5,
      borderRadius: appSpacing.md,
      paddingHorizontal: appSpacing.md,
      fontSize: 14,
      fontWeight: '400',
    },
  });
