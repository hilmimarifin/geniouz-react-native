/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {Home, Search} from '../pages/';
import Product from '../pages/product';
import ProductStack from './ProductStack';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="home" headerMode="none" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}} detachInactiveScreens={false}>
    <Stack.Screen name="maintab" component={MainTab} />
    <Stack.Screen name="home" component={Home} />
    {/* <Stack.Screen name="product" component={ProductStack} /> */}

  </Stack.Navigator>
);

export default HomeStack;
