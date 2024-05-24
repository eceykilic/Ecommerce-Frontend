import * as types from "../actions/productAction/productActionTypes";
import * as fetchTypes from "../actions/fetchStatesTypes";

const initialState = {
  productList: [],
  totalProductCount: 0,
  error: "",
  fetchState: fetchTypes.NOT_FETCHED,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        fetchState: fetchTypes.FETCHING,
      };
    case types.FETCH_PRODUCTS_SUCCESS:
      if (
        action.payload &&
        Array.isArray(action.payload.productList) &&
        typeof action.payload.totalProductCount === "number"
      ) {
        return {
          ...state,
          fetchState:
            action.payload.productList.length !== 0
              ? fetchTypes.FETCHED
              : fetchTypes.FETCHING,
          productList: action.payload.productList,
          totalProductCount: action.payload.totalProductCount,
        };
      } else {
        console.error("FETCH_PRODUCTS_SUCCESS payload is not valid");
        return {
          ...state,
          fetchState: fetchTypes.FAILED,
          error: "FETCH_PRODUCTS_SUCCESS payload is not valid",
        };
      }
    case types.FETCH_MORE_PRODUCTS:
      if (action.payload && Array.isArray(action.payload.productList)) {
        return {
          ...state,
          fetchState: fetchTypes.FETCHED,
          productList: [...state.productList, ...action.payload.productList],
          totalProductCount: action.payload.totalProductCount,
        };
      } else {
        console.error("FETCH_MORE_PRODUCTS payload is not valid");
        return state;
      }
    case types.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        fetchState: fetchTypes.FAILED,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
