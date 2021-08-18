/* eslint-disable prettier/prettier */
const INITIAL_STATE = [];

export const productsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'GET_PRODUCTS':
      state = payload;
      return state;
    default:
      return state;
  }
};

const detailProduct = {variants: []};
export const detailProductReducer =  (state = detailProduct, {type, payload}) => {
  switch (type) {
    case 'GET_DETAIL_PRODUCT':
      state = {...state, ...payload};
      return state;
    case 'ADD_VARIANT':
      state.variants.push(payload.variants);
      return state;
    case 'EDIT_VARIANT':
      state.variants[payload.index] = payload.variants;
      return state;
    case 'EDIT_PRODUCT':
      state = {...state, ...payload};
      return state;
    case 'ADD_CATEGORY':
      state.categories = payload;
      return state;
    default:
      return state;
  }
};