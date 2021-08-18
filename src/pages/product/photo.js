/* eslint-disable prettier/prettier */
import React from 'react';
import {ImageBackground, View} from 'react-native';
import Header from '../../components/header';

const Photo = ({route}) => {
  return (
    <View>
      <Header title='image' backButton/>
      <ImageBackground 
        source={{uri: `${route.params.url}` }}
        style={{height: '100%', width: '100%'}}
      />
    </View>
  );
};

export default Photo;
