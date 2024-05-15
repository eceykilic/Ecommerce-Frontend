import * as types from '../actions/globalAction/globalActionTypes'

const initialState = {
    roles : [],
    categories : [],
    theme : '',
    language : '',
};

const globalReducer = (state = initialState, action) => {
    switch(action.type){
        case types.UPDATE_ROLES:
            return{
                ...state,
                roles:action.payload,
            };
        case types.UPDATE_CATEGORIES:
            return{
                ...state,
                categories:action.payload,
            };
        case types.UPDATE_THEME:
            return {
                ...state,
                theme:action.payload,
            };
        case types.UPDATE_LANGUAGE:
            return {
                ...state,
                theme: action.payload,
            };
        default:
            return state;
    }
};

export default globalReducer;