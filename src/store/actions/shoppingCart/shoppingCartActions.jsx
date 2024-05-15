import {
    DECREMENT_CART_ITEM,
    REMOVE_CART_ITEM,
    SET_ADDRESS,
    ADD_TO_CART,
    SET_PAYMENT,
    TOGGLE_CHECK_ITEM,
  } from "../shoppingCart/shoppingCartActionTypes";
  
  export const setAddToCart = (cart, operation) => {
    return {
      type: operation === "decrement" ? DECREMENT_CART_ITEM : ADD_TO_CART,
      payload: cart,
    };
  };
  
  export const toggleCheckItemAction = (item) => {
    return {
      type: TOGGLE_CHECK_ITEM,
      payload: item,
    };
  };
  
  export const removeFromCart = (product) => {
    return { type: REMOVE_CART_ITEM, payload: product };
  };
  
  export const setPayment = (payment) => {
    return { type: SET_PAYMENT, payload: payment };
  };
  
  export const setAddress = (address) => {
    return { type: SET_ADDRESS, payload: address };
  };

  export const clearShoppingCart = () => {
    return {
      type: 'CLEAR_SHOPPING_CART',
    };
  };