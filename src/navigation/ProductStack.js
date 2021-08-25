/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {Home, Product} from '../pages';
import VariantStack from './VariantStack';
import Photo from '../pages/product/photo';

const Stack = createStackNavigator();

const ProductStack = () => (
  <Stack.Navigator initialRouteName="product" detachInactiveScreens={false} headerMode="none">
    <Stack.Screen name="product" component={Product} options={{gestureDirection: 'horizontal', gestureEnabled: true}}/>
    <Stack.Screen name="variantStack" component={VariantStack}  options={{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
    <Stack.Screen name="photo" component={Photo} />
    {/* <Stack.Screen name="home" component={Home} /> */}
  </Stack.Navigator>
);

export default ProductStack;
