/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Home from './src/screens/Home';
import DetailsScreen from './src/screens/DetailsScreen';
import {RootStackParamList} from './src/types/RootNavTypes';

const AppStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <AppStack.Screen name="Home" component={Home} />
          <AppStack.Screen name="Details" component={DetailsScreen} />
        </AppStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
