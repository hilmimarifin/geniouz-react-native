/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { useFetch } from '../../hooks';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../redux/actions/products-action';
import Header from '../../components/header';
import ListItem from './ListItem';
import { get_categories } from '../../redux/actions/categories-action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_brands } from '../../redux/actions/brands-action';


const Home = () => {
  const [reactor, setReactor] = useState(useSelector(state =>state.reactorReducer));
  const dispatch = useDispatch();
  const storage = AsyncStorage.getItem('userData')
  console.log('nilai sotorage',storage)
  useEffect(() => {
    axios.get('https://geniouz-strapi.herokuapp.com/products')
      .then(data => {
        dispatch(get_products(data.data));
        setLoading(false);
        setReactor(reactor)
      })
      .catch(err => {console.log(err);});
    axios.get('https://geniouz-strapi.herokuapp.com/categories')
      .then(data => {
        dispatch(get_categories(data.data));
        setLoading(false);
        setReactor(reactor)
        })
      .catch(err => {console.log(err);});
    axios.get('https://geniouz-strapi.herokuapp.com/brands')
      .then(data => {
        dispatch(get_brands(data.data))

        setLoading(false);
        setReactor(reactor)
        })
      .catch(err => {console.log(err);});

  }, [reactor]);
  const data = useSelector(state => state.productsReducer);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    axios.get('https://geniouz-strapi.herokuapp.com/products')
      .then(data => {
        dispatch(get_products(data.data));
        // setData(data.data);
        setLoading(false);
        setReactor(reactor)
        setRefreshing(false)
      })
      .catch(err => {console.log(err);});
    axios.get('https://geniouz-strapi.herokuapp.com/categories')
      .then(data => {
        dispatch(get_categories(data.data));
        setLoading(false);
        setReactor(reactor)
        })
      .catch(err => {console.log(err);});
    axios.get('https://geniouz-strapi.herokuapp.com/brands')
      .then(data => {
        dispatch(get_brands(data.data))
        setLoading(false);
        setReactor(reactor)
        })
      .catch(err => {console.log(err);});

  }
  return (
    <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
      <Header title="Home" addButton="product"/>
      {loading ? <Loading/>:
        <View style={style.container}>
          {data.map(item => {return <ListItem key={item.id} product={item}/>})}
          {/* <FlatList
            data={data}
            renderItem={({item}) => <ListItem product = {item}/>}
          /> */}
        </View>
      }
    </Container>
  );

};
const style = StyleSheet.create({
  container: {paddingHorizontal: 8},
});


export default Home;
