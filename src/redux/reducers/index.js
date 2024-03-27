import { combineReducers } from 'redux';

import user from './user';


const rootReducer = combineReducers({
    userDetails: user,
    
});


export default rootReducer;
