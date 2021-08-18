/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Search} from '../pages/';
import Product from '../pages/product';
import ProductStack from './ProductStack';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator initialRouteName="home" headerMode="none">
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="product" component={ProductStack} />

  </Stack.Navigator>
);

export default HomeStack;
