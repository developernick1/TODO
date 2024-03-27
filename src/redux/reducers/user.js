import * as dispatchTypes from "../constant"


let initialState = {
    isLoggedIn: false, 
}

export default (state = initialState, action) => {
    switch (action.type) {
        case dispatchTypes.IS_LOGGED_IN:
            return {...state, isLoggedIn: action.payload };
        default:
            return state;
    }
}