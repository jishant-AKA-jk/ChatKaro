import React, {useMemo} from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';
import {THEME_TYPE} from '../utils/Enums';
import {ITheme} from '../theme/Theme';

const AppSafeAreaWrapper = ({children}: {children: React.ReactNode}) => {
  const {theme, currentTheme} = useTheme();
  const insets = useSafeAreaInsets();
  const style = useMemo(() => componentStyle(theme, insets), [theme, insets]);

  return (
    <SafeAreaView style={style.safeContainer}>
      <StatusBar
        translucent
        backgroundColor={theme.base_primary}
        barStyle={
          currentTheme === THEME_TYPE.Light ? 'dark-content' : 'light-content'
        }
      />
      {children}
    </SafeAreaView>
  );
};

const componentStyle = (theme: ITheme, insets: EdgeInsets) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: theme.base_secondary,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
      position: 'relative',
    },
  });

export default AppSafeAreaWrapper;
