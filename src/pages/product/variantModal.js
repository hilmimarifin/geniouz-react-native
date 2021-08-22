/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View} from 'react-native';
import CheckBox1 from '../../components/CheckBox';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import { Colors } from '../../theme'; 
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions/products-action';
import { useForm } from '../../hooks';

const VariantModal = () => {  
  const [form, setForm] = useForm({});
  const saveData = () => {
    
  }
    return (
    <View>
      <Modal
        showComponent={
          <View
            style={{
              paddingVertical: 10,
              marginHorizontal: 8, 
              marginVertical: 2,
            }}>
            <Text small>Kategori</Text>
            <Text
              style={{
                color: Colors.lightGrey,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: Colors.white,
                paddingVertical: 4,
              }}>
              { formCategories.map(item => {
                   const g = categories.find(i => i.id === item)
                    return `${g.title}, `
                  })
              }
            </Text>
          </View>
        }
        modalComponent={
          <View>
          <TextInput label="Warna" onChangeText={(x)=> setForm('color', x)}>{color}</TextInput>
          <NumberInput step={1} label="M" onChange={(a)=>setForm('size_m', a)} value={size ? size.m : 0}/>
          <NumberInput step={1} label="L" onChange={(a)=>setForm('size_l', a)} value={size ? size.l : 0}/>
          <NumberInput step={1} label="XL" onChange={(a)=>setForm('size_xl', a)} value={size ? size.xl : 0}/>
          <NumberInput step={1} label="XXL" onChange={(a)=>setForm('size_xxl', a)} value={size ? size.xxl : 0}/>
         <Button text="Simpan" onPress={saveData}/>
        </View>
  
        }
      />
    </View>
  );
};

export default VariantModal;
