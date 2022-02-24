import {
  FETCH_SELLERS,
  FETCH_PRODUCT_DETAIL,
  SET_LOADING_SELLERS,
  SET_ERROR_SELLERS,
} from '../actionType/sellers';

const initialState = {
  sellers: [],
  productDetail: {},
  loading: false,
  error: null,
};

export default function sellersReducer (state = initialState, action)  {
  switch (action.type) {
    case FETCH_SELLERS:
      return {
        ...state,
        sellers: action.payload,
      };
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case SET_LOADING_SELLERS:
      console.log(action, 'action');
      return {
        ...state,
        loading: action.payload,
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