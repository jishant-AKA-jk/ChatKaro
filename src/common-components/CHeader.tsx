import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {groupStyles} from '../utils/appfunctions';
import CSvgIcons from './CSvgIcons';
import {SVG_ICONS} from '../utils/Enums';
import {useStyles, useTheme} from '../context/ThemeContext';
import {CStyles} from '../theme/CStyles';
import CText from './CText';
import {useAuth} from '../context/AuthContext';
import {ITheme} from '../theme/Theme';

export default function CHeader() {
  const {theme} = useTheme();
  const {logout} = useAuth();
  const st = useStyles(styles);
  return (
    <View style={st.header}>
      <View
        style={groupStyles(CStyles.flexRow, {
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 16,
        })}>
        <CSvgIcons
          name={SVG_ICONS.ChatKaroAppIcon}
          color={theme.primary}
          size={70}
        />
        <View>
          <CText
            style={{fontWeight: 'bold', fontSize: 16, fontStyle: 'italic'}}>
            Chat
          </CText>
          <CText
            style={{fontWeight: 'bold', fontSize: 24, fontStyle: 'italic'}}>
            {'   '}Karo
          </CText>
        </View>
      </View>
      <TouchableOpacity onPress={logout}>
        <CSvgIcons color={theme.text_primary} name={SVG_ICONS.LogoutIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = (theme: ITheme) =>
  StyleSheet.create({
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
  });
