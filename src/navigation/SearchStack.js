/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../pages/';
import Variants from '../pages/product/variants';


const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator initialRouteName="home" headerMode="none">
    <Stack.Screen name="search" component={Variants} />
  </Stack.Navigator>
);

export default SearchStack;
