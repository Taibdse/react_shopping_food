import { SET_ORDERS } from './Types';
import uuid from 'uuid';

export function setOrder(cart){
    return function(dispatch){
        let time = new Date().getTime();
        let newCart = JSON.parse(JSON.stringify(cart))
        dispatch({ type: SET_ORDERS, payload: { cart: newCart, time, id: uuid.v4() } });
    }
}

