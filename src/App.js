/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Home, Search} from './components/pages/';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <FlashMessage position="top" />
    </Provider>
  );
};

export default App;
