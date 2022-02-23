import {
  FETCH_SELLERS,
  SET_LOADING_SELLERS,
  SET_ERROR_SELLERS,
} from '../actionType/sellers';

const initialState = {
  sellers: [],
  loading: false,
  error: null,
};

export default function sellerReducer (state = initialState, action)  {
  switch (action.type) {
    case FETCH_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    case SET_LOADING_SELLERS:
      return {
        ...state,
      };
    case SET_ERROR_SELLERS:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}