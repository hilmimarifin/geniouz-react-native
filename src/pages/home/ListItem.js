/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import Text from '../../components/Text';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getDetailProduct } from '../../redux/actions/products-action';
import img from '../../asset/images/icon.png'


const ListItem = ({product}) => {
  const {name, variants, salePrice, images, code, id} = product;
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const handlePress = () => {
    dispatch(getDetailProduct(product));
    navigate('product', {screen: 'product', params: {id: id}});
  };
  const stock = variants.map(i => { return (i.size.l + i.size.m + i.size.xl + i.size.xxl)});
  const sum = (arr) => {
    let value = 0;
    for (let i = 0; i < arr.length; i++){
      value += arr[i];
    }
    return value;
  };
  const productStock = sum(stock);
  const getColor = () =>{
    let colors = []
    for(let i = 0; i<variants.length; i++){
      if(!colors.includes(variants[i].color)){
        colors.push(variants[i].color)
      }
    }
    return colors
  }
  const colour = getColor();
  const colours = colour.map(i => {return (`${i}, `)})
  return (
    <View style={{marginTop: 20}}>
      <TouchableOpacity
        style={{flexDirection: 'row'}}
        onPress={handlePress}>
        <Image source={images[0] ? {uri: images[0].url} : img} style={{width: 90, height: 125, borderRadius: 5}} />
        <View style={{marginHorizontal: 8}}>
          <Text small bold>
            {name}
          </Text>
          <Text small>{code}</Text>
          <Text small>{colours}</Text>
          <Text small>{productStock} pcs</Text>

        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;
