/* eslint-disable prettier/prettier */
import { StackActions, useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Platform, ActivityIndicator, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Text from '../../components/Text';
import { removeFromStorage } from '../../hooks/asyncStorage';
import { logout } from '../../redux/actions/auth-actions';


const Account = () => {
    const data = useSelector(state => state.authReducer);
    const dispatchRedux = useDispatch();
    const {reset, dispatch} = useNavigation()
    const handlePress = () => {
      dispatchRedux(logout())
      removeFromStorage('userData')
      // reset({index: 1, routes: [{name: 'login'}]})
      dispatch(StackActions.replace('loginStack'))
    }
  return (
    <Container>
      <View>
        <Text small>Username: {data.username}</Text>
        <Text small>Email: {data.email} </Text>
        <Button text="Sign Out" onPress={handlePress} />
      </View>
    </Container>
  );
};

export default Account;
