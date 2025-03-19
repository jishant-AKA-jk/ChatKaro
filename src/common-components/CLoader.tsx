import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useStyles, useTheme} from '../context/ThemeContext';
import {ITheme} from '../theme/Theme';

interface ILoader {
  isLoading: boolean;
  children: React.ReactNode;
}

const ICLoader = ({isLoading, children}: ILoader) => {
  const {theme} = useTheme();
  const styles = useStyles(style);

  if (!isLoading) {
    return children;
  }
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <ActivityIndicator
          style={styles.progress}
          size={'large'}
          color={theme.primary as string}
        />
      </View>
    </View>
  );
};

const style = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.base_secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressContainer: {
      width: '80%',
      justifyContent: 'center',
    },
  });

export default ICLoader;
