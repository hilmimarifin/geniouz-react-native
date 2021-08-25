/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {View, Switch, Platform, ActivityIndicator, Image, FlatList, TouchableOpacity} from 'react-native';
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
const Variants = ({route}) => {
    const {goBack, navigate} = useNavigation();
    const dispatch = useDispatch();
    const [form, setForm] = useForm(route.params || {});
    const {color, size, id, index, productId, longSleeve} = route.params || {};
    const [isEnabled, setIsEnabled] = useState(longSleeve || false);
    const data =  {  
                     id: id,
                     index: index,
                     variants:{
                                color: form.color ,
                                longSleeve: isEnabled,
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

    const deleteData = () => {
      dispatch(deleteVariant(id));
      dispatch(reactor());
      goBack();
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <Container>
      <View>
        <TextInput label="Warna" onChangeText={(x)=> setForm('color', x)}>{color}</TextInput>
        <View style={{flexDirection: 'row', marginHorizontal: 8, paddingHorizontal: 30,marginVertical: 10,  alignItems: 'center', justifyContent: 'space-between'}}>
          <Text>Lengan Pendek</Text>
          <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          />
         <Text>Lengan Panjang</Text>
        </View>
        <NumberInput step={1} label="M" onChange={(a)=>setForm('size_m', a)} value={size ? size.m : 0}/>
        <NumberInput step={1} label="L" onChange={(a)=>setForm('size_l', a)} value={size ? size.l : 0}/>
        <NumberInput step={1} label="XL" onChange={(a)=>setForm('size_xl', a)} value={size ? size.xl : 0}/>
        <NumberInput step={1} label="XXL" onChange={(a)=>setForm('size_xxl', a)} value={size ? size.xxl : 0}/>
       {id ? 
       <DeleteButton text="Hapus" color={Colors.red} onPress={deleteData}/>
       : null}
       <Button text="Simpan" onPress={saveData}/>
      </View>
    </Container>
  );
};
export default Variants;
