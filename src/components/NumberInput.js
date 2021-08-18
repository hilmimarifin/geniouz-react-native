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
      <Text small style={{paddingHorizontal: 4}}>
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
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 2,
    // paddingHorizontal: 8,
    width: '100%',
    borderBottomColor: Colors.white
  },
  textInputStyle: {
    color: Colors.lightGrey,
    fontSize: 20,
    // borderColor: 'red',
    // paddingHorizontal: 0,
    // borderWidth: 1

  },
});

export default NumberInput;
