import axios from "axios";

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
} from "../constants/productConstants";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// This function fetches a list of products from the backend API.
// It takes an optional keyword parameter to filter the products by name.
export const listProducts = (keyword = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    // Make an HTTP GET request to the backend to retrieve the list of products.
    const { data } = await axios.get(`/api/products${keyword}`);

    // Dispatch the PRODUCT_LIST_SUCCESS action with the fetched data.
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch the PRODUCT_LIST_FAIL action with the error message.
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// This function fetches the details of a product with a given ID from the backend API.
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    // Make an HTTP GET request to the backend to retrieve the details of the product with the given ID.
    const { data } = await axios.get(`/api/products/${id}`);

    // Dispatch the PRODUCT_DETAILS_SUCCESS action with the fetched data.
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch the PRODUCT_DETAILS_FAIL action with the error message.
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// this function lets you delete a product

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    // Set the state to "loading" before making the API call
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    // Get the user information from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set up the configuration for the request, including the token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make the API call to delete the product with the specified ID
    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    // If the call is successful, update the state to reflect that the product was deleted
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    // If the call fails, update the state to reflect the error message
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// this function creates a new product. 

export const createProduct = () => async (dispatch, getState) => {
  try {
    // Set the state to "loading" before making the API call
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    // Get the user information from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set up the configuration for the request, including the token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make the API call to create a new product
    const { data } = await axios.post(`/api/products/create/`, {}, config);

    // If the call is successful, update the state to reflect the newly created product
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If the call fails, update the state to reflect the error message
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// Action creator to update a product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    // Dispatch request to update product
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    // Get user information from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set request headers
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API call to update product
    const { data } = await axios.put(
      `/api/products/update/${product._id}/`,
      product,
      config
    );

    // Dispatch success with updated product data
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    // Dispatch success to update the product details
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    // Dispatch failure with error message
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// Action creator to create a product review
export const createProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    // Dispatch request to create a product review
    dispatch({
      type: PRODUCT_CREATE_REVIEW_REQUEST,
    });

    // Get user information from state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set request headers
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Make API call to create a product review
    const { data } = await axios.post(
      `/api/products/${productId}/reviews/`,
      review,
      config
    );

    // Dispatch success with created review data
    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
      payload: data,
    });

  } catch (error) {
    // Dispatch failure with error message
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};