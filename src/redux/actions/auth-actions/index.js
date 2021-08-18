/* eslint-disable prettier/prettier */
// import {USER_LOGIN_SUCCES, USER_LOGIN_FAILURE, USER_LOGOUT} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login_success = ( data ) => {
  const userData = {username: data.user.username,
                      email: data.user.email,
                      id: data.user.id,
                      token: data.jwt,
                    };
  try {
    AsyncStorage.setItem('userData', JSON.stringify(userData));
     return {
      type:'USER_LOGIN_SUCCESS',
      payload:  userData,
  };
  } catch (err){ return console.log('gagal menyimpan data ke storage');}

};

export const logout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};
