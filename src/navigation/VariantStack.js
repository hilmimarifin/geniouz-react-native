/* eslint-disable prettier/prettier */
import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {Home, Product} from '../pages';
import Variants from '../pages/product/variants';

const Stack = createStackNavigator();

const VariantStack = () => (
  <Stack.Navigator initialRouteName="variants" headerMode="none">
    <Stack.Screen name="product" component={Product} />
    <Stack.Screen name="variants" component={Variants} options={{cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS}}/>
    {/* <Stack.Screen name="home" component={Home} /> */}
  </Stack.Navigator>
);

export default VariantStack;
