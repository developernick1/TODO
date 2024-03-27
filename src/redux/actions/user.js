import * as dispatchTypes from "../constant"



export const setIsloggedIn = data => dispatch => {
    dispatch({
        type: dispatchTypes.IS_LOGGED_IN,
        payload: data,
    });
};
