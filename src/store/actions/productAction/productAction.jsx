import * as types from './productActionTypes';
import  instanceAxios  from '../../../api/axiosInstance';

const fetchProductsRequest = () => ({
    type: types.FETCH_PRODUCTS_REQUEST
});

const fetchProductsSuccess = (productList, totalProductCount) => ({
    type: types.FETCH_PRODUCTS_SUCCESS,
    payload: {
        productList,
        totalProductCount,
    }
});
const fetchMoreProducts = (productList, totalProductCount) => ({
    type: types.FETCH_MORE_PRODUCTS,
    payload: {
        productList,
        totalProductCount,
    }
});

const fetchProductsFailure = (error) => ({
    type: types.FETCH_PRODUCTS_FAILURE,
    payload : {error}
});

const fetchProducts = (params) => {
    return (dispatch) => {
    dispatch(fetchProductsRequest());
    instanceAxios
        .get("/products", {params})
        .then((response) => {
            dispatch(fetchProductsSuccess(response.data.products,response.data.total));
        })
        .catch((error) => {
            dispatch(fetchProductsFailure(error.message));
        })
    }
}
const addMoreProducts = (params) => {
    return (dispatch) => {
    dispatch(fetchProductsRequest());
    instanceAxios
        .get("/products", {params})
        .then((response) => {
            dispatch(fetchMoreProducts(response.data.products,response.data.total));
        })
        .catch((error) => {
            dispatch(fetchProductsFailure(error.message));
        })
    }
}


export {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProducts,
    addMoreProducts
};