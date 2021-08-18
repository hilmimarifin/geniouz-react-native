/* eslint-disable prettier/prettier */
import {
  USER_LOGIN_SUCCES, USER_LOGIN_FAILURE, USER_LOGOUT
} from '../actions/auth-actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userData = AsyncStorage.getItem('userData')
const INITIAL_STATE = userData;
console.log('nilai assyc', INITIAL_STATE);

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type){
      case 'USER_LOGIN_SUCCESS':
        state = payload;
        return state;
      case 'USER_LOGIN_FAILURE':
        return {
          ...state,
          password: '',
          loading: false,
          errorMessage: payload,
        };
      case 'USER_LOGOUT':
        return { ...INITIAL_STATE };
      default:
        return state;
  }
}
