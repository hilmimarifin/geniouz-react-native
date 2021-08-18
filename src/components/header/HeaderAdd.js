/* eslint-disable prettier/prettier */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../Icon';

const HeaderAdd = ({page}) => {
  const {navigate} = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(page)}>
        <Icon large name="plus" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 4,
    // marginLeft: 16,
  },
});

export default HeaderAdd;
