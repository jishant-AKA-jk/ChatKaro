import {ColorValue} from 'react-native';

export type ITheme = {
  primary: ColorValue;
  base_primary: ColorValue;
  base_secondary: ColorValue;
  primary_disabled: ColorValue;
  secondary: ColorValue;
  text_primary: ColorValue;
  text_on_primary: ColorValue;
  text_secondary: ColorValue;
  info: ColorValue;
  warning: ColorValue;
  success: ColorValue;
  error: ColorValue;
  border_focus: ColorValue;
  border_blur: ColorValue;
  button: ColorValue;
};

export const LightTheme: ITheme = {
  primary: '#f76c11',
  base_primary: '#ffffff',
  base_secondary: '#f7f7f7',
  info: '#2f80ED',
  text_primary: '#20232c',
  border_focus: '#f76c11',
  border_blur: '#e1e1e1',
  text_on_primary: '#fdfdfd',
  primary_disabled: '#f09d67',
  button: '#20222C',
  secondary: '#fae4d6',
  warning: '#e2b93b',
  success: '#27ae61',
  error: '#eb5757',
  text_secondary: '#4a4d56',
};

export const DarkTheme: ITheme = {
  primary: '#f76c11',
  base_primary: '#0d0d0d',
  base_secondary: '#2f2f2f',
  info: '#2f80ED',
  text_primary: '#e2e2e2',
  border_focus: '#f76c11',
  border_blur: '#4e4e4e',
  text_on_primary: '#2d2d2d',
  primary_disabled: '#f09d67',
  button: '#dfddd3',
  secondary: '#fae4d6',
  warning: '#e2b93b',
  success: '#27ae61',
  error: '#eb5757',
  text_secondary: '#b5b2a9',
};
