import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sellerReducer from './reducers/sellersReducer';

const store = createStore(
  combineReducers({
    seller: sellerReducer,
  }), applyMiddleware(thunk)
);

export default store;