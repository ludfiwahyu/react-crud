import {
  FETCH_SELLERS,
  SET_LOADING_SELLERS,
  SET_ERROR_SELLERS,
} from "../actionType/sellers";
import axios from "axios";

export const addNewSeller = (sellers) => {
  return async (dispatch, getstate) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:4000/sellers",
        data: sellers,
      });
      const result = await response.data;
      const { sellers } = getstate().seller;
      const newSellers = [...sellers, result];
      dispatch({
        type: FETCH_SELLERS,
        payload: newSellers,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR_SELLERS,
        payload: err,
      });
    }
  };
};

export const fetchSellers = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_SELLERS,
        payload: true,
      });
      const response = await axios({
        method: "get",
        url: "http://localhost:4000/sellers",
      });
      dispatch({
        type: FETCH_SELLERS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR_SELLERS,
        payload: err.response,
      });
    } finally {
      dispatch({
        type: SET_LOADING_SELLERS,
        payload: false,
      });
    }
  };
};
