/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Account, Home, Login} from '../pages';


const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator initialRouteName="account" headerMode="none">
    <Stack.Screen name="account" component={Account}/>
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="home" component={Home} />
  </Stack.Navigator>
);

export default AccountStack;
