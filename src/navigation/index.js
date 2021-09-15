/* eslint-disable prettier/prettier */
import React,{useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTab from './MainTab';
import { useDispatch, useSelector } from 'react-redux';
import LoginStack from './LoginStack';
import axios from 'axios';
import { get_products } from '../redux/actions/products-action';
import { get_categories } from '../redux/actions/categories-action';
import Loading from '../components/Loading';
import { View } from 'react-native';
import HomeStack from './HomeStack';
import HomeTab from './HomeTab';
import SplashScreen from '../pages/splash';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';


const Navigation = () => {
  const token = useSelector(state => state.authReducer.token);
  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        {/* {token ? <HomeTab/> : <LoginStack/>} */}
        <Stack.Navigator headerMode="none" detachInactiveScreens={false} screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}>
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="loginStack" component={LoginStack} />
          <Stack.Screen name="homeTab" component={HomeTab} />



        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Navigation;
