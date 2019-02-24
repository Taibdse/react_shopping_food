import {
    ADD_FOOD_TO_CART, MINUS_FOOD_QUANTITY_ON_CART, REMOVE_FOOD_ON_CART, REMOVE_CART
} from '../actions/Types';
import { getInitialCart, CART_STORAGE_KEY, saveDataToLocalStorage } from '../../services/storage';

const initialState = {
    cart: getInitialCart()
};

function handleMinusFoodQuantity(state, action){
    let data = state.cart.slice(); 
    let index = data.findIndex(item => item.food.id === action.payload.id);
    let cartItem = data[index];
    cartItem.quantity--;
    if(cartItem.quantity == 0) data.splice(index, 1);
    saveDataToLocalStorage(data, CART_STORAGE_KEY);
    return { cart: data }
}

function handleAddFoodToCart(state, action){
    let data = state.cart.slice(); 
    let cartItem = data.find(item => item.food.id === action.payload.id);
    if(!cartItem) {
        data = [...state.cart, { food: action.payload, quantity: 1 }];
    } else {
        cartItem.quantity++;
    }
    saveDataToLocalStorage(data, CART_STORAGE_KEY);
    return { cart: data }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD_TO_CART:
            return handleAddFoodToCart(state, action);

        case MINUS_FOOD_QUANTITY_ON_CART: 
            return handleMinusFoodQuantity(state, action)

        case REMOVE_FOOD_ON_CART: 
            let cart = state.cart.filter(cartItem => cartItem.food.id !== action.payload.id);
            saveDataToLocalStorage(cart, CART_STORAGE_KEY);
            return { cart };
        case REMOVE_CART: 
            saveDataToLocalStorage([], CART_STORAGE_KEY);
            return { cart: [] }
        default:
            return state;
    }
}