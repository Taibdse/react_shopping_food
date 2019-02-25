import { SET_ORDERS } from './Types';
import uuid from 'uuid';

export function setOrder(cart){
    return function(dispatch){
        let time = new Date().getTime();
        dispatch({ type: SET_ORDERS, payload: { cart, time, id: uuid.v4() } });
    }
}