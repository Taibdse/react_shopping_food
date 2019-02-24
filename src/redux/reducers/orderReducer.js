import {
    SET_ORDERS
} from '../actions/Types';
import { ORDERED_ITEMS_STORAGE_KEY, saveDataToLocalStorage, getInitialOrder } from '../../services/storage';

const initialState = {
    orders: getInitialOrder()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS: 
            let orders = [ action.payload ,...state.orders];
            saveDataToLocalStorage(orders, ORDERED_ITEMS_STORAGE_KEY);
            return { orders }

        default:
            return state;
    }
}