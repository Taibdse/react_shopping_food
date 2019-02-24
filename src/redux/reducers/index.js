import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import cartReducer from './cartReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    food: foodReducer,
    cart: cartReducer,
    admin: adminReducer
})