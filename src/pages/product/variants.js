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
const Variants = ({route, dataVariant, items, onChangeValue}) => {
    console.log('props variants', items)
    const {goBack, navigate} = useNavigation();
    const dispatch = useDispatch();
    const [form, setForm] = useForm(items || {});
    const {color, size, id, index, productId, longSleeve} = dataVariant || {};
    const [openVariants, setOpenVariants] = useState(false)
    const [isEnabled, setIsEnabled] = useState(items.longSleeve);
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
    console.log('nlai from', form)
    const saveData = () => {  
      // if (id) { dispatch(editVariant(data));} else {dispatch(addVariant(data));}
      // dispatch(reactor());
      goBack();
    };

    const deleteData = () => {
      dispatch(deleteVariant(id));
      dispatch(reactor());
      goBack();
    }
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View>
      <TouchableOpacity
                  key={index}
                  onPress={()=>setOpenVariants(true)}                
                >   
                    <Text style={style.variantsContainer} >
                      {items.color}
                    </Text>
      </TouchableOpacity> 
      <Modal
        visible={openVariants}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setOpenVariants(false);
        }}
      >
        <Container>
          <View>
            <TextInput label="Warna" onChangeText={(x)=> setForm('color', x)}>{items.color}</TextInput>
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
            <NumberInput step={1} label="M" onChange={(a)=>setForm('m', a)} value={form.size.m}/>
            <NumberInput step={1} label="L" onChange={(a)=>setForm('l', a)} value={form.size.l}/>
            <NumberInput step={1} label="XL" onChange={(a)=>setForm('xl', a)} value={form.size.xl}/>
            <NumberInput step={1} label="XXL" onChange={(a)=>setForm('xxl', a)} value={form.size.xxl}/>
          {id ? 
          <DeleteButton text="Hapus" color={Colors.red} onPress={deleteData}/>
          : null}
          <Button text="Simpan" onPress={saveData}/>
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
