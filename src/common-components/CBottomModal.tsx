import React, {ReactNode} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import CButton from './CButton';
import {useStyles, useTheme} from '../context/ThemeContext';
import {ITheme} from '../theme/Theme';
import {appSpacing} from '../theme/CStyles';

interface CBottomModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  containerStyle?: ViewStyle;
  modalStyle?: ViewStyle;
  confirmButtonStyle?: ViewStyle;
  confirmTextStyle?: TextStyle;
  children: ReactNode;
  confirmDisabled?: boolean;
}

export default function CBottomModal({
  visible,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  containerStyle,
  modalStyle,
  confirmButtonStyle,
  confirmTextStyle,
  children,
  confirmDisabled = false,
}: CBottomModalProps) {
  const st = useStyles(styles);
  return (
    <Modal
      transparent
      visible={visible}
      style={{flex: 1}}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity
        style={[st.overlay, containerStyle]}
        activeOpacity={1}
        onPress={onClose}>
        <TouchableOpacity
          activeOpacity={1}
          style={[st.modalContainer, modalStyle]}
          onPress={e => e.stopPropagation()}>
          <View style={st.contentContainer}>{children}</View>
          <View style={st.buttonContainer}>
            <CButton
              title={confirmText}
              onPress={onConfirm}
              buttonStyle={confirmButtonStyle}
              textStyle={confirmTextStyle}
              disabled={confirmDisabled}
            />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = (theme: ITheme) =>
  StyleSheet.create({
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.base_primary,
      borderTopLeftRadius: appSpacing.md,
      borderTopRightRadius: appSpacing.md,
      paddingHorizontal: appSpacing.base,
      paddingTop: appSpacing.base,
      paddingBottom: appSpacing.xl,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: -3},
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
    },
    contentContainer: {
      marginBottom: appSpacing.base,
    },
    buttonContainer: {
      marginTop: appSpacing.sm,
    },
  });
