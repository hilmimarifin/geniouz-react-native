/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator, TransitionSpecs} from '@react-navigation/stack';
import {Home, Search} from '../pages/';
import Product from '../pages/product';
import ProductStack from './ProductStack';
import MainTab from './MainTab';
import HomeStack from './HomeStack';
import DetailCategory from '../pages/category/detail';
import LoginStack from './LoginStack';
import ImageShow from '../pages/product/imageShow';

const Stack = createStackNavigator();

const HomeTab = () => (
  <Stack.Navigator initialRouteName="maintab" headerMode="none" screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}} detachInactiveScreens={false}>
    <Stack.Screen name="maintab" component={MainTab} />
    <Stack.Screen name="home" component={HomeStack} />
    <Stack.Screen name="product" component={ProductStack} options={{gestureDirection: 'horizontal'}} />
    <Stack.Screen name="categoryDetail" component={DetailCategory} />
    <Stack.Screen name="imageShow" component={ImageShow} />

    {/* <Stack.Screen name="login" component={LoginStack} /> */}

  </Stack.Navigator>
);

export default HomeTab;
