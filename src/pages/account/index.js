/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Platform, ActivityIndicator, Image} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Text from '../../components/Text';
import { logout } from '../../redux/actions/auth-actions';


const Account = () => {
    const data = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
  return (
    <Container>
      <View>
        <Text small>Username: {data.username}</Text>
        <Text small>Email: {data.email} </Text>
        <Button text="Sign Out" onPress={()=>dispatch(logout())} />
      </View>
    </Container>
  );
};

export default Account;
