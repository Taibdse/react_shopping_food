import {
    SET_ORDERS
} from '../actions/Types';
import { ORDERED_ITEMS_STORAGE_KEY, saveDataToLocalStorage, getInitialOrders } from '../../services/storage';

const initialState = {
    orders: getInitialOrders()
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS:
            const orders = [ action.payload ,...state.orders];
            saveDataToLocalStorage(orders, ORDERED_ITEMS_STORAGE_KEY);
            return { orders }

        default:
            return state;
    }
}