/* eslint-disable prettier/prettier */
export const get_products = data => {
  return {
    type: 'GET_PRODUCTS',
    payload: data,
  };
};

export const addVariant = data => {
  return {
    type: 'ADD_VARIANT',
    payload: data,
  };
};

export const editProduct = data => {
  return {
    type: 'EDIT_PRODUCT',
    payload: data,
  };
};

export const editVariant = data => {
  return {
    type: 'EDIT_VARIANT',
    payload: data,
  };
};

export const getDetailProduct = data => {
  return {
    type: 'GET_DETAIL_PRODUCT',
    payload: data,
  };
};

export const addCategory = data => {
  return {
    type: 'ADD_CATEGORY',
    payload: data,
  };
};

