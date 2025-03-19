import React from 'react';
import {SvgProps, SvgXml} from 'react-native-svg';
import {ColorValue} from 'react-native';
import {SVG_ICONS} from '../utils/Enums';
import {
  accountIcon,
  addIcon,
  backIcon,
  chatKaroAppIcon,
  closeIcon,
  homeIcon,
  joinIcon,
  logoutIcon,
  notificationIcon,
  searchIcon,
  sendIcon,
} from '../assets/Icons';
import {useTheme} from '../context/ThemeContext';

interface ISVGProps extends SvgProps {
  name: string;
  size?: number;
  width?: number;
  height?: number;
  style?: object;
  fill?: ColorValue;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const iconMap: Record<string, string> = {
  [SVG_ICONS.HomeIcon]: homeIcon,
  [SVG_ICONS.NotificationIcon]: notificationIcon,
  [SVG_ICONS.AccountIcon]: accountIcon,
  [SVG_ICONS.SearchIcon]: searchIcon,
  [SVG_ICONS.BackIcon]: backIcon,
  [SVG_ICONS.ChatKaroAppIcon]: chatKaroAppIcon,
  [SVG_ICONS.JoinIcon]: joinIcon,
  [SVG_ICONS.LogoutIcon]: logoutIcon,
  [SVG_ICONS.CloseIcon]: closeIcon,
  [SVG_ICONS.SendIcon]: sendIcon,
  [SVG_ICONS.AddIcon]: addIcon,
};

export default function CSvgIcons({
  name,
  size = 20,
  width,
  height,
  ...inputProps
}: Readonly<ISVGProps>) {
  const {theme} = useTheme();

  const xml = iconMap[name];

  if (!xml) {
    return null;
  }

  return (
    <SvgXml
      xml={xml}
      color={inputProps.fill ?? theme.secondary}
      width={width ?? size}
      height={height ?? size}
      {...inputProps}
    />
  );
}
