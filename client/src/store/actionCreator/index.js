import {
  FETCH_SELLERS,
  FETCH_PRODUCT_DETAIL,
  SET_LOADING_SELLERS,
  SET_ERROR_SELLERS,
  API_IMAGE,
} from "../actionType/sellers";
import axios from "axios";

export const addNewSeller = (payload) => {
  console.log(payload, "payload");
  return async (dispatch, getstate) => {
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:4000/sellers",
        data: payload,
      });
      const result = await response.data;
      console.log(result, "result");
      const { sellers } = getstate().sellers;
      const newSellers = [...sellers, result];
      dispatch({
        type: FETCH_SELLERS,
        payload: newSellers,
      });
    } catch (err) {
      console.log(err, "error");
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

export const fetchProductDetail = (id) => {
  console.log(id, "idindex");
  return async (dispatch, getstate) => {
    dispatch({
      type: SET_LOADING_SELLERS,
      payload: true,
    });
    try {
      const { loading } = getstate().sellers;
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/sellers/${id}`,
      });
      dispatch({
        type: FETCH_PRODUCT_DETAIL,
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

export const deleteProduct = (id) => {
  return async (dispatch, getstate) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `http://localhost:4000/sellers/${id}`,
      });
      const { sellers } = getstate().sellers;
      const newSellers = sellers.filter((item) => item.id !== id);
      dispatch({
        type: FETCH_SELLERS,
        payload: newSellers,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR_SELLERS,
        payload: err.response,
      });
    }
  };
}

export const updateProduct = (id, payload) => {
  return async (dispatch, getstate) => {
    try {
      const response = await axios({
        method: "PUT",
        url: `http://localhost:4000/sellers/${id}`,
        data: payload,
      });
      const { sellers } = getstate().sellers;
      const newSellers = sellers.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            ...payload,
          };
        }
        return item;
      });
      dispatch({
        type: FETCH_SELLERS,
        payload: newSellers,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR_SELLERS,
        payload: err.response,
      });
    }
  };
};


export const getImage = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_SELLERS,
        payload: true,
      });
      dispatch({
        type: API_IMAGE,
        payload: "https://via.placeholder.com/150",
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
