import * as types from './storeActionTypes';

export const setSellerStore = (storeData) => ({
    type: types.SET_SELLER_STORE,
    payload: storeData
});