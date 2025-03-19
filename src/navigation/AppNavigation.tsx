import React from 'react';
import {useAuth} from '../context/AuthContext';
import SignIn from '../screens/signin/SignIn';
import {STACK_SCREENS} from '../utils/Enums';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoomsList from '../screens/RoomList/RoomList';
import ChatScreen from '../screens/ChatRoom/ChatRoom';

export default function AppNavigation() {
  const {isLoggedIn} = useAuth();
  const Stack = createStackNavigator();

  if (!isLoggedIn) return <SignIn />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={STACK_SCREENS.RoomsList}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={STACK_SCREENS.RoomsList}
          component={ChatRoomsList}
        />
        <Stack.Screen name={STACK_SCREENS.ChatScreen} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
