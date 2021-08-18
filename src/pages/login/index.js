/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Keyboard, StyleSheet, Image} from 'react-native';
import {Colors} from '../../theme';
// import {Text, Button, LoginView, TextInput} from '~/components';
import Text from '../../components/Text';
import Button from '../../components/Button';
import LoginView from '../../components/LoginView';
import TextInput from '../../components/TextInput';
import Container from '../../components/Container';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { login_success } from '../../redux/actions/auth-actions';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import img from '../../asset/images/logo.jpg';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const sumbmit = (email, password) => {
    axios
      .post('https://geniouz-strapi.herokuapp.com/auth/local', {
        identifier: email,
        password: password,
      })
      .then(response => {
        const {data} = response;
        const userData = {username: data.user.username,
          email: data.user.email,
          id: data.user.id,
          token: data.jwt,
        };
        AsyncStorage.setItem('userData', JSON.stringify(userData))
        
        dispatch(login_success(response.data));
        setLoading(false);
        navigate('home');
      })
      .catch(error => {
        showMessage({message: "incorrect email or password", type: "danger"});
        setLoading(false);
      });
    }
  return (
    <Container>
        <View style={{marginVertical:'30%'}}>
          <View style={{alignItems: 'center'}}>
            <Image source={img} style={{width: 240, height: 100}}/>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              label="Password"
              onChangeText={text => setPassword(text)}
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          <View style={{marginBottom: 2}}>
            <Button
              text="Sign In"
              loading={loading}
              onPress={() => {
                Keyboard.dismiss();
                setLoading(true);
                sumbmit(email,password);
              }}
            />
          </View>
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
