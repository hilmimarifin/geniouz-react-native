/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';
import uiReducer from './ui-reducer';
import authReducer from './auth-reducer';
import {productsReducer, detailProductReducer} from './products-reducer';
import reactorReducer from './reactor-reducer';
import categoriesReducer from './categories-reducer';
import brandsReducer from './brands-reducer';

export default combineReducers({
    categoriesReducer,
    uiReducer,
    authReducer,
    productsReducer,
    reactorReducer,
    detailProductReducer,
    brandsReducer,
});
