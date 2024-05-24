import * as types from '../actions/userAction/userActionTypes';

const storedUser = localStorage.getItem('user');
const initialState = {
    isLoading: false,
    error: null,
    response: storedUser ? JSON.parse(storedUser) : {},
    userData: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                userData: action.payload,
                error: null,
            };
        case types.USER_SUCCESS:
            // Yanıtın JSON formatında olup olmadığını kontrol edelim
            let response;
            try {
                response = typeof action.payload === 'string' ? JSON.parse(action.payload) : action.payload;
            } catch (e) {
                return {
                    ...state,
                    isLoading: false,
                    error: 'Invalid response format',
                };
            }
            return {
                ...state,
                isLoading: false,
                response,
                error: null,
            };
        case types.USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case types.USER_LOG_OUT:
            return {
                isLoading: false,
                error: null,
                response: {},
                userData: {},
            };
        default:
            return state;
    }
};

export default userReducer;
