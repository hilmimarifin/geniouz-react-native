/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import Icon from '../components/Icon';
import AccountStack from './AccountStack';
import { Colors } from '../theme';
import CategoryStack from './CategoryStack';
import Statistic from '../pages/statistic';

const Tab = createBottomTabNavigator();

// eslint-disable-next-line arrow-parens
const getTabIcon = (name) => ({ color }) => <Icon name={name} color={color} />;

const MainTab = () => (
  <Tab.Navigator
    initialRouteName="homeStack"
    tabBarOptions={{
      showLabel: false,
      tabStyle: {
        borderTopColor: Colors.white,
        backgroundColor: Colors.black,
        borderTopWidth: StyleSheet.hairlineWidth,
      },
      keyboardHidesTabBar: true,
      activeTintColor: Colors.white,
      inactiveTintColor: Colors.lightGrey,
      style: { backgroundColor: Colors.black },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
        options={{ tabBarIcon: getTabIcon('home') }}
    />
     <Tab.Screen
      name="Statistic"
      component={Statistic}
        options={{ tabBarIcon: getTabIcon('clipboard') }}
    />
    <Tab.Screen
      name="Search"
      component={CategoryStack}
        options={{ tabBarIcon: getTabIcon('list') }}
    />
     <Tab.Screen
      name="Account"
      component={AccountStack}
        options={{ tabBarIcon: getTabIcon('user') }}
    />
  </Tab.Navigator>
);

export default MainTab;
