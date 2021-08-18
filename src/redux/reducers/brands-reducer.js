/* eslint-disable prettier/prettier */
const INITIAL_STATE = [];

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'GET_BRANDS':
      state = payload;
      return state;
    default:
      return state;
  }
};
