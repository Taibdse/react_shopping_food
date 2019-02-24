import { combineReducers } from 'redux';
import foodReducer from './foodReducer';
import cartReducer from './cartReducer';
import adminReducer from './adminReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';

export default combineReducers({
    food: foodReducer,
    cart: cartReducer,
    admin: adminReducer,
    order: orderReducer,
    user: userReducer
})