/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {Home, Login} from '../pages';
import HomeTab from './HomeTab';
import Navigation from '.';


const Stack = createStackNavigator();

const LoginStack = () => (
  <Stack.Navigator initialRouteName="login" headerMode="none" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}} detachInactiveScreens={false}>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="home" component={HomeTab} />

  
  </Stack.Navigator>
);

export default LoginStack;
