import {
    ADD_FOOD_TO_CART, MINUS_FOOD_QUANTITY_ON_CART, REMOVE_FOOD_ON_CART, REMOVE_CART, SET_USER_FOR_CART
} from '../actions/Types';
import { CARTS_STORAGE_KEY, saveDataToLocalStorage, getInitialCarts, getInitialCurUserAccount } from '../../services/storage';
import { isNotEmpty } from '../../validations/isNotEmpty';

const initialCarts = getInitialCarts();
const account = getInitialCurUserAccount();
let initialCart = { data: [], userId: '' };

if(isNotEmpty(account) && isNotEmpty(initialCarts)){
    initialCart = initialCarts.find(cartPerUser => cartPerUser.userId === account.id);
    if(!initialCart){
        initialCart = { data: [], userId: account.id };
    }
}

const initialState = {
    cart: initialCart,
    carts: getInitialCarts()
};

// { userId: 1, data }
function handleMinusFoodQuantity(state, action){
    let cart = Object.assign({}, state.cart);
    let carts = state.carts.slice();
    let index = cart.data.findIndex(item => item.food.id === action.payload.id);
    let cartItem = cart.data[index];
    cartItem.quantity--;
    if(cartItem.quantity === 0) cart.data.splice(index, 1);
    
    if(cart.userId !== ''){
        let index = carts.findIndex(cartPerUser => cartPerUser.userId === state.cart.userId)
        if(index > -1){
            carts[index] = cart;
        }
        saveDataToLocalStorage(carts, CARTS_STORAGE_KEY);
    }
    return { ...state, cart, carts }
}

function handleAddFoodToCart(state, action){
    let cart = JSON.parse(JSON.stringify(state.cart));
    let carts = state.carts.slice();
    let cartItem = cart.data.find(item => item.food.id === action.payload.id);
    if(!cartItem) {
        cart.data.push({ food: action.payload, quantity: 1 })
    } else {
        cartItem.quantity++;
    }
   
    if(cart.userId !== ''){
        let index = carts.findIndex(cartPerUser => cartPerUser.userId === state.cart.userId);
        if(index > -1){
            carts[index] = cart;
        } else {
            carts.push(cart);
        }
        saveDataToLocalStorage(carts, CARTS_STORAGE_KEY);
    }
    return { ...state, cart, carts }
}

function handleRemoveCart(state, action){
    let carts = state.carts.slice();
    let cart = JSON.parse(JSON.stringify(state.cart));
    if(cart.userId !== ''){
        let index = carts.findIndex(cartPerUser => cartPerUser.userId === cart.userId);
        if(index > -1) {
            carts[index] = { ...cart, data: [] };
        }
        cart = { ...cart, data: [] };
        saveDataToLocalStorage(carts, CARTS_STORAGE_KEY);
    } else {
        cart = { userId: '', data: [] };
    }
    return { ...state, carts, cart };
}

function handleRemoveFoodOnCart(state, action){
    let cart = JSON.parse(JSON.stringify(state.cart));
    let carts = state.carts.slice();
    cart.data = cart.data.filter(item => item.food.id !== action.payload.id);
    if(cart.userId !== ''){
        let index = carts.findIndex(cartPerUser => cartPerUser.userId === cart.userId);
        if(index > -1) {
            carts[index] = JSON.parse(JSON.stringify(cart));
        }
        saveDataToLocalStorage(carts, CARTS_STORAGE_KEY);
    }
    return { ...state, cart, carts };
}

function handleSetUserForCart(state, action){
    let carts = state.carts.slice();
    let cart = JSON.parse(JSON.stringify(state.cart));
    let index = carts.findIndex(cartPerUser => cartPerUser.userId === action.payload);
    if(index > -1){
        carts[index] = cart;
    } else {
        carts.push({ ...cart, userId: action.payload });
    }
    cart.userId = action.payload; 
    return { ...state, cart, carts };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD_TO_CART:
            return handleAddFoodToCart(state, action);

        case MINUS_FOOD_QUANTITY_ON_CART: 
            return handleMinusFoodQuantity(state, action)

        case REMOVE_FOOD_ON_CART: 
            return handleRemoveFoodOnCart(state, action);

        case REMOVE_CART: 
            return handleRemoveCart(state, action);
        
        case SET_USER_FOR_CART:
            return handleSetUserForCart(state, action);

        default:
            return state;
    }
}