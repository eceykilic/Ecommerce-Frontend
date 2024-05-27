import axios from "axios";
import * as types from './globalActionTypes';

export const updateRoles = () => {
    return (dispatch) => {
        axios.get("http://localhost:9000/roles")
            .then((response) => {
                dispatch({ type: types.UPDATE_ROLES, payload: response.data });
                console.log(response)
            })
            .catch((error) => {
                console.log("Roles Fetching Error: " + error.message);
            });
    };
};

export const updateCategories = () => {
    return (dispatch) => {
        axios.get("http://localhost:9000/category/")
            .then((response) => {
                dispatch({ type: types.UPDATE_CATEGORIES, payload: response.data });
            })
            .catch((error) => {
                console.log("Categories Fetching Error: " + error.message);
            });
    };
};

export const updateTheme = (theme) => {
    return {
        type: types.UPDATE_THEME,
        payload: theme,
    };
};

export const updateLanguage = (language) => {
    return {
        type: types.UPDATE_LANGUAGE,
        payload: language,
    };
};
