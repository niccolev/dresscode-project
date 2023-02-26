import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// This function creates a new order and sends a request to the backend
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // Dispatch an action to set the request state to "loading"
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // Get the user's authentication information from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set the request configuration options, including authentication headers
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send a POST request to the backend with the new order data and the configuration options
    const { data } = await axios.post(`/api/orders/add/`, order, config);

    // Dispatch an action to set the request state to "success" and store the new order data in the state
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // Dispatch an action to clear the items in the cart in the state
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });

    // Remove the cart items from local storage
    localStorage.removeItem("cartItems");
  } catch (error) {
    // If there is an error, dispatch an action to set the request state to "fail" and store the error message in the state
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// This function retrieves the details of a specific order from the backend
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    // Dispatch an action to set the request state to "loading"
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // Get the user's authentication information from the state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set the request configuration options, including authentication headers
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send a GET request to the backend for the order with the specified ID and the configuration options
    const { data } = await axios.get(`/api/orders/${id}/`, config);

    // Dispatch an action to set the request state to "success" and store the order data in the state
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // If there is an error, dispatch an action to set the request state to "fail" and store the error message in the state
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// action creator to pay for an order
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    // get user information from the application state
    const {
      userLogin: { userInfo },
    } = getState();

    // set the headers for the API request with the user token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // make an API request to pay for the order with the given ID
    const { data } = await axios.put(
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );

    // dispatch a success action with the data returned from the API
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // dispatch a failure action with the error message
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// action creator to mark an order as delivered
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    // get user information from the application state
    const {
      userLogin: { userInfo },
    } = getState();

    // set the headers for the API request with the user token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // make an API request to mark the order as delivered
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver/`,
      {},
      config
    );

    // dispatch a success action with the data returned from the API
    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // dispatch a failure action with the error message
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// Action creator for fetching the logged-in user's orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // Get the logged-in user's information from the application state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set headers for the request to include the user's authorization token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send a GET request to the server to fetch the user's orders
    const { data } = await axios.get(`/api/orders/myorders/`, config);

    // Dispatch an action with the fetched data
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch an action with the error message if the request fails
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// Action creator for fetching all orders
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    // Get the logged-in user's information from the application state
    const {
      userLogin: { userInfo },
    } = getState();

    // Set headers for the request to include the user's authorization token
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Send a GET request to the server to fetch all orders
    const { data } = await axios.get(`/api/orders/`, config);

    // Dispatch an action with the fetched data
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    // Dispatch an action with the error message if the request fails
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};