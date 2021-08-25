/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../theme';
import Text from './Text';
import NumericInput from 'react-native-numeric-input';

const NumberInput = ({label, ...props}) => {
  const {container, textInputStyle} = styles;

  return (
    <View style={container}>
      <Text small style={{paddingHorizontal: 8}}>
        {label}
      </Text>
      <NumericInput
        inputStyle={textInputStyle}
        selectionColor={Colors.white}
        containerStyle={container}
        // totalWidth={300}
        // totalHeight={45}
        rightButtonBackgroundColor={Colors.lightGrey}
        leftButtonBackgroundColor={Colors.lightGrey}
        type={'up-down'}
        upDownButtonsBackgroundColor='black'
        iconStyle={{color: Colors.white, borderBottomColor: Colors.white}}
        borderColor='black'
        minValue={0}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 4,
    paddingVertical: 5,
    marginVertical: 2,
    // paddingHorizontal: 8,
    width: '98%',
    borderBottomColor: Colors.white
  },
  textInputStyle: {
    textAlign: 'left',
    color: Colors.lightGrey,
    fontSize: 20,
    width: '90%',
    paddingLeft: 2,
    paddingRight: 0,
    // borderColor: 'red',
    // borderWidth: 1

  },
});

export default NumberInput;
