/* eslint-disable prettier/prettier */
// import {USER_LOGIN_SUCCES, USER_LOGIN_FAILURE, USER_LOGOUT} from './types';

export const login_success = ( data ) => {
     return {
      type:'USER_LOGIN_SUCCESS',
      payload:  data,
  };


};

export const logout = () => {
  return {
    type: 'USER_LOGOUT',
  };
};
