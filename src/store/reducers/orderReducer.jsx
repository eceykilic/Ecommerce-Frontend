import * as types from '../actions/orderAction/orderActionTypes';

const initialState = {
  payment: null,
  address: [],
  cards: [],
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PAYMENT:
      console.log("SET_PAYMENT action payload:", action.payload);
      return { ...state, payment: action.payload };
    case types.SET_ADDRESS:
      console.log("SET_ADDRESS action payload:", action.payload);
      return { ...state, address: action.payload };
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        address: state.address.filter((item) => item.id !== action.payload),
      };
    case types.UPDATE_ADDRESS:
      return {
        ...state,
        address: state.address.map((address) =>
          address.id === action.payload.id
            ? { ...address, ...action.payload }
            : address
        ),
      };
    case types.ADD_CARDS:
      console.log("New card added:", action.payload);
      return { ...state, cards: [...state.cards, action.payload] };
    case types.REMOVE_CARDS:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload), // Remove the card with the specified ID
      };
    case types.SET_LOADING:
      return { ...state, loading: action.payload };


      
    default:
      return state;
  }
};

export default orderReducer;
