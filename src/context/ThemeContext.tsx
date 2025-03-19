import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import {Appearance} from 'react-native';
import {DarkTheme, ITheme, LightTheme} from '../theme/Theme';
import {THEME_TYPE} from '../utils/Enums';

type IThemeContextType = {
  theme: ITheme;
  toggleTheme: () => void;
  currentTheme: THEME_TYPE;
};

const ThemeContext = createContext<IThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const colorScheme = Appearance.getColorScheme();
  const [currentTheme, setCurrentTheme] = useState(
    colorScheme === THEME_TYPE.Dark ? THEME_TYPE.Dark : THEME_TYPE.Light,
  );
  const [theme, setTheme] = useState<ITheme>(
    colorScheme === THEME_TYPE.Dark ? DarkTheme : LightTheme,
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(currentTheme === THEME_TYPE.Dark ? DarkTheme : LightTheme);
      setCurrentTheme(
        currentTheme === THEME_TYPE.Dark ? THEME_TYPE.Dark : THEME_TYPE.Light,
      );
    });

    return () => listener.remove();
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === THEME_TYPE.Light ? DarkTheme : LightTheme);
    setCurrentTheme(
      currentTheme === THEME_TYPE.Light ? THEME_TYPE.Dark : THEME_TYPE.Light,
    );
  };

  return (
    <ThemeContext.Provider value={{theme, currentTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useStyles = (styles: (theme: ITheme) => any) => {
  const {theme} = useTheme();
  const themedStyles = useMemo(() => styles(theme), [theme]);

  return themedStyles;
};

export const useTheme = (): IThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeProvider not found');
  }
  return context;
};
