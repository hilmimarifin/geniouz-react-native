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

const CategoriesField = ({categories, formCategories, id, onChangeValue}) => {
    const detailProduct = useSelector(state => state.detailProductReducer)
    const [value, setValue] = useState(formCategories )
    const dispatch = useDispatch();
    const productCategories = detailProduct.categories
    const ids = formCategories? formCategories : []
    const handleChange = (id) => {
      
      if (value.includes(id)){ 
         value.splice(value.indexOf(id),1)
        }
      else { value.push(id)}
    };
    return (
    <View>
      <Modal
        cancelButton
        acceptButton
        onAccept={()=>onChangeValue(value)}
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
            {categories.map((item) => {
              return <CheckBox1 key={item.id} value={ids.includes(item.id)} text={item.title} onChange={()=> handleChange(item.id
                )}/>;
            })}
          </View>
        }
      />
    </View>
  );
};

export default CategoriesField;
