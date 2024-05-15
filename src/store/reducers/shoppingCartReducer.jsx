import {
  ADD_TO_CART,
  DECREMENT_CART_ITEM,
  SET_PAYMENT,
  SET_ADDRESS,
  TOGGLE_CHECK_ITEM,
  REMOVE_CART_ITEM,
} from "../actions/shoppingCart/shoppingCartActionTypes";

const localStorageKey = "shoppingCart";

// Function to load cart data from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem(localStorageKey);
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cart: loadCartFromLocalStorage(),
  payment: {},
  address: [],
};

export const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add to Cart
    case ADD_TO_CART:
      const addedToCartListIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (addedToCartListIndex !== -1) {
        const updatedCartList = [...state.cart];
        updatedCartList[addedToCartListIndex].count += 1;
        updatedCartList[addedToCartListIndex].checked = true;

        // Update local storage
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCartList));

        return { ...state, cart: updatedCartList };
      } else {
        const updatedCart = [
          ...state.cart,
          { count: 1, checked: true, ...action.payload },
        ];

        // Update local storage
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));

        return { ...state, cart: updatedCart };
      }

    // Remove from Cart
    case REMOVE_CART_ITEM:
      const updatedCartAfterRemoval = state.cart.filter(
        (item) => item.id !== action.payload.id
      );

      // Update local storage
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(updatedCartAfterRemoval)
      );

      return { ...state, cart: updatedCartAfterRemoval };

    // Decrement Cart Item
    case DECREMENT_CART_ITEM:
      const updatedCartAfterDecrement = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, count: Math.max(0, item.count - 1) };
        }
        return item;
      });

      // Update local storage
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(updatedCartAfterDecrement)
      );

      return { ...state, cart: updatedCartAfterDecrement };

    // Toggle Check Item
    case TOGGLE_CHECK_ITEM:
      const toggledCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });

      // Update local storage
      localStorage.setItem(localStorageKey, JSON.stringify(toggledCart));

      return { ...state, cart: toggledCart };

    // Set Payment
    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    // Set Address
    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case "CLEAR_SHOPPING_CART":
      return {
        ...state,
        cart: [], // Sepeti boşalt
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
