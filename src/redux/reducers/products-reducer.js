/* eslint-disable prettier/prettier */
const INITIAL_STATE = [];

export const productsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case 'GET_PRODUCTS':
      state = payload;
      return state;
    case 'GET_PRODUCTS_MORE ':
      state = [...state, ...payload];
      return state;
    default:
      return state;
  }
};

const detailProduct = {
  variants: [],
  images: [],
  name: '',
  description: '',
  purchasePrice: 0,
  salePrice: 0,
  material: '',
  shopeeUrl: '',
  tokpedUrl:'',
  brand: '',
  categories: []
};
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
    case 'DELETE_VARIANT':
      state.variants.splice(state.variants.indexOf(payload),1)
      console.log('nilai hasil filter', state.variants)

      return state;   
    case 'EDIT_PRODUCT':
      state = {...state, ...payload};
      return state;
    case 'ADD_CATEGORY':
      state.categories = payload;
      return state;
    case 'CLEAR_PRODUCT':
      state = detailProduct;
      return state;
    default:
      return state;
  }
};