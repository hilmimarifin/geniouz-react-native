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


const Navigation = () => {
  // const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token);
  // const [reactor, setReactor] = useState(useSelector(state =>state.reactorReducer));
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get('https://geniouz-strapi.herokuapp.com/products')
  //     .then(data => {
  //       dispatch(get_products(data.data));
  //       setLoading(false);
  //       setReactor(reactor)
  //     })
  //     .catch(err => {console.log(err);});
  //   axios.get('https://geniouz-strapi.herokuapp.com/categories')
  //     .then(data => {
  //       dispatch(get_categories(data.data));
  //       setLoading(false);
  //       setReactor(reactor)
  //       })
  //     .catch(err => {console.log(err);});
  // }, [reactor]);
  return (
      <NavigationContainer>
        {token ? <MainTab /> : <LoginStack/>}
      </NavigationContainer>
  );
};

export default Navigation;
