/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, ScrollView, RefreshControl, StyleSheet, TextInput } from 'react-native';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import { Colors } from '../../theme';

const SearchBar = ({onChangeValue}) => {
  const [value, setValue] = useState('')
  const handleChange = (a) => {
    setValue(a);
    onChangeValue(a)
  }
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon name="search" color={Colors.black}/>
      </View>
      <View style={style.textContainer}>
         <TextInput 
            placeholder="masukan nama/kode produk"
            placeholderTextColor={Colors.darkGrey}
            onChangeText={(a) => handleChange(a)}
            value={value}
         />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 10,
        borderWidth: 2,
        borderColor: Colors.lightGrey,
        borderRadius: 10,
        marginHorizontal:10,
        backgroundColor: Colors.lightGrey,
        maxHeight: 45
    },
    iconContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
        justifyContent: 'center',
        marginLeft: 20,
        paddingRight: 20,
    },
    textContainer: {
        // borderWidth: 1,
        // borderColor: 'red',
    }
})
export default SearchBar;
