/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {Account, Home, Login} from '../pages';


const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator initialRouteName="account" headerMode="none" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}} detachInactiveScreens={false}>
    <Stack.Screen name="account" component={Account}/>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="home" component={Home} />
  </Stack.Navigator>
);

export default AccountStack;
