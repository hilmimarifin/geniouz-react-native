/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, RefreshControl} from 'react-native';
import Text from '../../components/Text';
import Container from '../../components/Container';
import Header from '../../components/header';
import { Colors } from '../../theme';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../../components/Loading';

const Statistic = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=createdAt:DESC&_limit=-1')
     .then(res => {setData(res.data) ; setLoading(false)})
  }, [])
  //menjumlahkan array value
  const sum = (stock) => {
    let total = 0;
    for (let i=0; i<stock.length; i++){
      total += stock[i]
    }
    return total;
  }
  const sumAll = (arr) =>{
    let stock = [];
    let stockProduct = [];
    let total = 0;
    let nilai = [];
    let nilaiTotal = 0;
    for (let x = 0; x < arr.length; x++){
     stock[x] = arr[x].variants.map(i => { return (i.size.l + i.size.m + i.size.xl + i.size.xxl)});
     stockProduct[x] = sum(stock[x]);
     nilai[x] = stockProduct[x] * arr[x].purchasePrice;
     total += stockProduct[x];
     nilaiTotal += nilai[x];
    }
    return {totalBarang: total, totalNilai: nilaiTotal};
  };
  const hasil = sumAll(data);
  const totalProduct = hasil.totalBarang;
  const nilaiTotal = hasil.totalNilai;
  const withSparator = String(nilaiTotal).replace(/(.)(?=(\d{3})+$)/g,'$1.');

  const onRefresh = () => {
    setRefreshing(true);
    axios.get('https://geniouz-strapi.herokuapp.com/products?_sort=createdAt:DESC&_limit=-1')
     .then(res => {setData(res.data); setRefreshing(false)})
  }
  return (
    <Container refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing}/>}>
        <Header title="Statistik"/>
        {loading? <Loading /> : 
        <View style={{flexDirection: 'row', flexWrap: 'wrap',
         marginVertical: 10}}>
            <View style={style.boxContainer}>
                <Text small bold>Total Barang</Text>
                <Text small> {totalProduct} pcs</Text>
            </View>
            <View style={style.boxContainer}>
                <Text small bold>Total Nilai Barang</Text>
                <Text small> Rp {withSparator}</Text>
            </View>
        </View>
        }
    </Container>
  );
};

const style = StyleSheet.create({
    boxContainer: {
        borderWidth: 1,
        width: '45%',
        borderColor: Colors.white, borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginHorizontal: 6,
    }
})
export default Statistic;
