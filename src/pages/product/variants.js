/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Switch, StyleSheet,  Platform, ActivityIndicator, Image, FlatList, TouchableOpacity, Modal} from 'react-native';
import { useDispatch} from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import TextInput from '../../components/TextInput';
import useForm from '../../hooks/useForm';
import { addVariant, deleteVariant, editVariant } from '../../redux/actions/products-action';
import NumberInput from '../../components/NumberInput';
import { useNavigation } from '@react-navigation/native';
import { reactor } from '../../redux/actions/reactor-action';
import Text from '../../components/Text';
import { Colors } from '../../theme';
import DeleteButton from '../../components/DeleteButton';
const Variants = ({items, onChangeValue, index, visible, setVisible, onDelete, komponen}) => {
    const [data, setData] = useState();
    console.log('props ites', data)
    const handleChange = (properties, value) => {
      setData({...data, size: {...data.size,[properties] : value}})
    }
    
    const handleChangeColor = (x) => {
      setData({...data, color: x})
    }

    const saveData = () => {
      onChangeValue(data)  
      setVisible(false)
    };

    const deleteData = () => {
      onDelete(index)
      setVisible(false)
    }
    const toggleSwitch = () => setData({...data, longSleeve: !data.longSleeve});
  return (
    <View>
    
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <Container>
          <View>
            <TextInput label="Warna" onChangeText={(x)=> handleChangeColor(x)}>{data?.color}</TextInput>
            <View style={{flexDirection: 'row', marginHorizontal: 8, paddingHorizontal: 30,marginVertical: 10,  alignItems: 'center', justifyContent: 'space-between'}}>
              <Text>Lengan Pendek</Text>
              <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={data?.longSleeve ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={data?.longSleeve}
              />
            <Text>Lengan Panjang</Text>
            </View>
            <NumberInput step={1} label="M" onChange={(a)=> handleChange('m', a)} value={data?.size?.m}/>
            <NumberInput step={1} label="L" onChange={(a)=> handleChange('l', a)} value={data?.size?.l}/>
            <NumberInput step={1} label="XL" onChange={(a)=> handleChange('xl', a)} value={data?.size?.xl}/>
            <NumberInput step={1} label="XXL" onChange={(a)=> handleChange('xxl', a)} value={data?.size?.xxl}/> 
            <DeleteButton text="Hapus" color={Colors.red} onPress={deleteData}/>
          <Button text="Simpan" onPress={()=> saveData()}/>
          </View>
        </Container>
      </Modal>
    </View>
  );
};


const style = StyleSheet.create({
  variantsContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: `${Colors.lightGrey}`,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 10
  }
})
export default Variants;
