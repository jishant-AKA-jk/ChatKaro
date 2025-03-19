import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CStyles} from '../theme/CStyles';

const CKeyboardAvoidingView = ({
  children,
  ...props
}: KeyboardAvoidingViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
      style={CStyles.container}
      {...props}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default CKeyboardAvoidingView;
