/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {View} from 'react-native';
import CheckBox1 from '../../components/CheckBox';
import Modal from '../../components/Modal';
import Text from '../../components/Text';
import { Colors } from '../../theme'; 
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions/products-action';
import RadioGroup from 'react-native-radio-buttons-group';

const BrandsField = ({brandsData, formBrands, onChangeValue}) => {
    const [radioButtons, setRadioButtons] = useState(
        brandsData.map(i => {return {id: i.id, value:i.id, label: i.title, selected: i.id === formBrands, size: 18, containerStyle: {width: 100} }})
        )

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
        const idValue = radioButtons.find(i => i.selected === true)
        onChangeValue(idValue.id)
    }
    const k = radioButtons.find(i => i.selected === true)
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
            <Text small>Brand</Text>
            <Text
              style={{
                color: Colors.lightGrey,
                fontSize: 20,
                borderBottomWidth: 1,
                borderColor: Colors.white,
                paddingVertical: 4,
              }}>
                  {k.label}
            </Text>
          </View>
        }
        modalComponent={
          <View>
            <RadioGroup 
                radioButtons={radioButtons} 
                onPress={onPressRadioButton}
                
            />
          </View>
        }
      />

    </View>
  );
};

export default BrandsField;
