/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Platform, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
import { useDispatch} from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput';
import useForm from '../../hooks/useForm';
import { addVariant, editVariant } from '../../redux/actions/products-action';
import NumberInput from '../../components/NumberInput';
import { useNavigation } from '@react-navigation/native';
import { reactor } from '../../redux/actions/reactor-action';
const Variants = ({route}) => {
    const {goBack} = useNavigation();
    const dispatch = useDispatch();
    const [form, setForm] = useForm(route.params || {});
    const {color, size, id, index} = route.params || {};
    const data =  {  id: id,
                     index: index,
                     variants:{
                                color: form.color ,
                                size: { m: form.size_m || (size ? size.m : 0) ,
                                        l: form.size_l || (size ? size.l : 0) ,
                                        xl: form.size_xl || (size ? size.xl : 0) ,
                                        xxl: form.size_xxl || (size ? size.xxl : 0),
                                        },
                     },
                  };
    const saveData = () => {
      if (id) { dispatch(editVariant(data));} else {dispatch(addVariant(data));}
      dispatch(reactor());
      goBack();
    };
  return (
    <Container>
      <View>
        <TextInput label="Warna" onChangeText={(x)=> setForm('color', x)}>{color}</TextInput>
        <NumberInput step={1} label="M" onChange={(a)=>setForm('size_m', a)} value={size ? size.m : 0}/>
        <NumberInput step={1} label="L" onChange={(a)=>setForm('size_l', a)} value={size ? size.l : 0}/>
        <NumberInput step={1} label="XL" onChange={(a)=>setForm('size_xl', a)} value={size ? size.xl : 0}/>
        <NumberInput step={1} label="XXL" onChange={(a)=>setForm('size_xxl', a)} value={size ? size.xxl : 0}/>
       <Button text="Simpan" onPress={saveData}/>
      </View>
    </Container>
  );
};
export default Variants;
