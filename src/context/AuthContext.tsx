import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_STORAGE_KEY} from '../utils/appConstants';
import {isExpiredUser} from '../utils/appfunctions';

export interface IUserInfo {
  username: string;
  id: number;
  created_at?: string;
  expires_at?: string;
  code?: number;
}

type IAuthContext = {
  isLoggedIn: boolean;
  login: (userInfo: IUserInfo) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  userInfo: IUserInfo | null;
};

const AuthContext = createContext<IAuthContext | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedAuthState = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

        if (storedAuthState) {
          const user: IUserInfo = JSON.parse(storedAuthState);
          if (isExpiredUser(user.expires_at)) {
            setUserInfo(null);
            setIsLoggedIn(false);
          } else {
            setUserInfo(user);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (userInfo: IUserInfo) => {
    try {
      setIsLoggedIn(true);
      setUserInfo(userInfo);
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userInfo));
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      setIsLoggedIn(false);
      setUserInfo(null);
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const userInfo = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        isLoading,
        userInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('AuthProvider not found');
  }

  return context;
};
