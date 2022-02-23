import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import sellersReducer from './reducers/sellersReducer';

const store = createStore(
  combineReducers({
    sellers: sellersReducer,
  }), applyMiddleware(thunk)
);

export default store;