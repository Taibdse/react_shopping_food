import { SET_ORDERS } from './Types';

export function setOrder(cart){
    return function(dispatch){
        let time = new Date().getTime();
        dispatch({ type: SET_ORDERS, payload: { cart, time } });
    }
}