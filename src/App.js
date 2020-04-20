/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useCallback} from 'react';
import {StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {MainScreen} from './screens';

const App = () => {
  const [isInitialized, setInitialized] = useState(false);
  const initialize = useCallback(async () => {
    await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    );
    setInitialized(true);
  }, [setInitialized]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </NavigationContainer>
  );
};

export default App;
