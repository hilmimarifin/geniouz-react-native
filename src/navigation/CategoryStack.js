/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../pages';
import Variants from '../pages/product/variants';
import Category from '../pages/category';
import DetailCategory from '../pages/category/detail';


const Stack = createStackNavigator();

const CategoryStack = () => (
  <Stack.Navigator initialRouteName="category" headerMode="none">
    <Stack.Screen name="category" component={Category} />
    {/* <Stack.Screen name="categoryDetail" component={DetailCategory} /> */}
  </Stack.Navigator>
);

export default CategoryStack;
