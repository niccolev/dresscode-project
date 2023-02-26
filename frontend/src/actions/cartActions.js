import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ADD TO CART @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
// This part of the code exports an action creator function called addToCart. 
// When called, it first makes a GET request to the server to retrieve information 
// about a product with a given id. If the request is successful, the function dispatches 
// an action with the type CART_ADD_ITEM and a payload containing the product information, 
// along with the requested quantity. Finally, it saves the current cart items to localStorage.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


export const addToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ REMOVE FROM CART @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// This part of the code exports an action creator function called removeFromCart. 
// When called, it dispatches an action with the type CART_REMOVE_ITEM and a payload 
// containing the id of the product to be removed from the cart. 
// Finally, it saves the current cart items to localStorage.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SAVE SHIPPING ADDRESS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// This part of the code exports an action creator function called saveShippingAddress. 
// When called, it dispatches an action with the type CART_SAVE_SHIPPING_ADDRESS 
// and a payload containing the shipping address data. 
// Finally, it saves the shipping address to localStorage.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ SAVE PAYMENT METHOD @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //
// This part of the code exports an action creator function called savePaymentMethod. 
// When called, it dispatches an action with the type CART_SAVE_PAYMENT_METHOD 
// and a payload containing the payment method data. 
// Finally, it saves the payment method to localStorage.
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
