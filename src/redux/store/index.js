import ReduxThunk from 'redux-thunk';
import {compose, createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';

const middlewares = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
