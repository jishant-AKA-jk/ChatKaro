import React from 'react';
import {ThemeProvider} from './context/ThemeContext';
import {AuthProvider} from './context/AuthContext';
import AppNavigation from './navigation/AppNavigation';
import AppSafeAreaWrapper from './components/SafeAreaViewWrapper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <AppSafeAreaWrapper>
            <AppNavigation />
          </AppSafeAreaWrapper>
        </SafeAreaProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
