/* eslint-disable prettier/prettier */
const INITIAL_STATE = {}
export default(state = INITIAL_STATE, {type, payload}) => {

  switch (type){
      case 'USER_LOGIN_SUCCESS':
        state ={...state, ...payload};
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
