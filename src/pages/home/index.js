/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl, StyleSheet, ActivityIndicator } from 'react-native';
import Text from '../../components/Text';
import Container from '../../components/Container';
import { useFetch } from '../../hooks';
import axios from 'axios';
import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { clearDetailProduct, get_products, get_products_more } from '../../redux/actions/products-action';
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
  const [indexFetch, setIndexFetch] = useState(0)
  useFocusEffect(
      React.useCallback(() => {
        axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=updatedAt:DESC&_limit=15')
        .then(res => {
          dispatch(get_products(res.data));
          setLoading(false);
          setIndexFetch(indexFetch + res.data.length)
          console.log('nilai data1', res.data)

        })
        .catch(err => {console.log(err);});
        dispatch(clearDetailProduct())
    
      },[reactor,axios,dispatch,data, searchValue])
  )
  // const searchData = (x) => {
  //   axios.get(`https://geniouz-strapi.herokuapp.com/products?code_contains=${x}&_sort=updatedAt:DESC&_limit=15`)
  //   .then(res => {return res.data})
  //   .catch(err=> {console.log('error saat mencari', err)})
  // }
  const data = useSelector(state => state.productsReducer);
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setSearchValue] = useState('')
  const dataShow = searchValue ? data.filter(i => i.code.includes(searchValue.toUpperCase()) || i.name.toUpperCase().includes(searchValue.toUpperCase())) : data;
  const [loadingMore, setLoadingMore] = useState(false)
  const handleReached = () => {
    setLoadingMore(true)
    axios.get(`https://geniouz-strapi.herokuapp.com/products?_sort=updatedAt:DESC&_start=16&_limit=15`)
    .then(res => {
      dispatch(get_products_more(res.data))
      setLoadingMore(false)
      console.log('nilai data', dataShow)
    })
    .catch(err => console.log('error fetch more', err))
  }
  const bottomComponent = () => {
    if(loadingMore) {
      return <ActivityIndicator size="large" color="green"/>
    }
    return null
  }
  const onRefresh = () => {
    setRefreshing(true);
    axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=updatedAt:DESC&_limit=15')
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
    
    <Container flatlist refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
     
      <Header title="Home" addButton="product"/>
      <SearchBar onChangeValue={(a)=> setSearchValue(a)}/>
      {loading ? <Loading/>:
        <View style={style.container}>
          {dataShow.length !== 0 ? 
          // dataShow.map(item => {return <ListItem key={item.id} product={item}/>})
            <FlatList 
              contentContainerStyle = {{borderWidth: 1, borderColor: 'yellow'}}
              data = {dataShow}
              renderItem = {({item}) =>  {return <ListItem product={item} />} }
              onEndReachedThreshold= {0.5}
              onEndReached ={()=> handleReached()}
              ListFooterComponent= {()=> bottomComponent()}
            />
            
            : <Text>Produk tidak ditemukan</Text>
          }
        </View>
      }
    </Container>
  );

};
const style = StyleSheet.create({
  container: {paddingHorizontal: 8, flex: 1},
});


export default Home;
