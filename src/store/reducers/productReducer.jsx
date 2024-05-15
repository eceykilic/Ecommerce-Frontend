import * as types from '../actions/productAction/productActionTypes';
import * as fetchTypes from '../actions/fetchStatesTypes';

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
                fetchState: fetchTypes.FETCHING
            };
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                fetchState: action.payload.productList.length !== 0 ? fetchTypes.FETCHED : fetchTypes.FETCHING,
                productList: action.payload.productList,
                totalProductCount: action.payload.totalProductCount,
            };
        case types.FETCH_MORE_PRODUCTS:
            return {
                ...state,
                fetchState: fetchTypes.FETCHED,
                productList: [...state.productList,...action.payload.productList],
                totalProductCount: action.payload.totalProductCount,
            };
        case types.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                fetchState: fetchTypes.FAILED,
                error: action.payload
            };
        default:
            return state;
    }
};
export default productReducer;