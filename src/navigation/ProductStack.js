/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, Product} from '../pages';
import VariantStack from './VariantStack';
import Photo from '../pages/product/photo';

const Stack = createStackNavigator();

const ProductStack = () => (
  <Stack.Navigator initialRouteName="product" headerMode="none">
    <Stack.Screen name="product" component={Product} />
    <Stack.Screen name="variantStack" component={VariantStack} />
    <Stack.Screen name="photo" component={Photo} />
    {/* <Stack.Screen name="home" component={Home} /> */}
  </Stack.Navigator>
);

export default ProductStack;
