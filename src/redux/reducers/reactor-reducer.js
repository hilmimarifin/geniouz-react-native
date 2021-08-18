/* eslint-disable prettier/prettier */
const INITIAL_STATE = false;

export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'REACTOR':
      return !state;
    default:
      return state;
  }
};
