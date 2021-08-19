import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './app/pages/Home';
import { GamePage } from './app/pages/GamePage';
import { SettingsPage } from './app/pages/Settings';
import { MultiPlayerJoinFormPage } from './app/pages/MultiPlayerJoinForm';
import { MultiPlayerCreateFormPage } from './app/pages/MultiPlayerCreateForm';
import { MultiPlayerSelectPage } from './app/pages/MultiplayerSelect';
import { SinglePlayerFormPage } from './app/pages/SinglePlayerForm';
import { MultiPlayerWaitPage } from './app/pages/MultiplayerWait';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="SinglePlayerForm" component={SinglePlayerFormPage} />
        <Stack.Screen name="MultiPlayerSelect" component={MultiPlayerSelectPage} />
        <Stack.Screen name="MultiPlayerWait" component={MultiPlayerWaitPage} />
        <Stack.Screen name="MultiPlayerCreateForm" component={MultiPlayerCreateFormPage} />
        <Stack.Screen name="MultiPlayerJoinForm" component={MultiPlayerJoinFormPage} />
        <Stack.Screen name="Settings" component={SettingsPage} />
        <Stack.Screen name="Game" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}