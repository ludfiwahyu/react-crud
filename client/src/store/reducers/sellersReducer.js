import {
  FETCH_SELLERS,
  FETCH_PRODUCT_DETAIL,
  SET_LOADING_SELLERS,
  SET_ERROR_SELLERS,
  API_IMAGE,
} from "../actionType/sellers";

const initialState = {
  sellers: [],
  productDetail: {},
  loading: false,
  error: null,
  apiImage: "",
};

export default function sellersReducer(state = initialState, action) {
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
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR_SELLERS:
      return {
        ...state,
        error: action.payload,
      };
    case API_IMAGE:
      return {
        ...state,
        apiImage: action.payload,
      };
    default:
      return state;
  }
}
