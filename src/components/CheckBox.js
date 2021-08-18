/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const CheckBox1 = ({text, value, ...props}) => {
  const [isSelected, setSelection] = useState(value);
  const {container, checkbox, label, checkboxContainer} = styles;
  return (
    <View style={container}>
          <View style={checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={checkbox}
              {...props}
            />
            <Text style={label}>{text}</Text>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default CheckBox1;
