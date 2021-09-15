/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { useFetch } from '../../hooks';
import axios from 'axios';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { clearDetailProduct, get_products } from '../../redux/actions/products-action';
import Header from '../../components/header';
import ListItem from './ListItem';
import { get_categories } from '../../redux/actions/categories-action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_brands } from '../../redux/actions/brands-action';
import SearchBar from './SearchBar';


const Home = () => {
  const [reactor, setReactor] = useState(useSelector(state =>state.reactorReducer));
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  useFocusEffect(
      React.useCallback(() => {
        axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=createdAt:DESC')
        .then(data => {
          dispatch(get_products(data.data));
          axios.get('https://geniouz-strapi.herokuapp.com/categories')
          .then(data => {
            dispatch(get_categories(data.data));
            axios.get('https://geniouz-strapi.herokuapp.com/brands')
            .then(data => {
              dispatch(get_brands(data.data))
              setLoading(false);
              })
            .catch(err => {console.log(err);});    
            })
          .catch(err => {console.log(err);});
        })
        .catch(err => {console.log(err);});
        dispatch(clearDetailProduct())
    
      },[reactor,axios,dispatch,data])
  )
  const data = useSelector(state => state.productsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const dataShow = searchValue ? data.filter(i => i.code.includes(searchValue.toUpperCase()) || i.name.toUpperCase().includes(searchValue.toUpperCase())) : data;
  const onRefresh = () => {
    setRefreshing(true);
    axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=createdAt:DESC')
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
    dispatch(clearDetailProduct())
  }
  return (
    
    <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
     
      <Header title="Home" addButton="product"/>
      <SearchBar onChangeValue={(a)=> setSearchValue(a)}/>
      {loading ? <Loading/>:
        <View style={style.container}>
          {dataShow.length !== 0 ? dataShow.map(item => {return <ListItem key={item.id} product={item}/>})
            : <Text>Produk tidak ditemukan</Text>
          }
        </View>
      }
    </Container>
  );

};
const style = StyleSheet.create({
  container: {paddingHorizontal: 8},
});


export default Home;
