import {
    ADD_FOOD_TO_CART, MINUS_FOOD_QUANTITY_ON_CART, REMOVE_FOOD_ON_CART
} from '../actions/Types';

const initialState = {
    cart: []
};

function handleMinusFoodQuantity(state, action){
    let cart = state.cart.slice(); 
    let index = cart.findIndex(item => item.food.id === action.payload.id);
    let cartItem = cart[index];
    cartItem.quantity--;
    if(cartItem.quantity == 0) cart.splice(index, 1);
    return { cart };
}

function handleAddFoodToCart(state, action){
    let cart = state.cart.slice(); 
    let cartItem = cart.find(item => item.food.id === action.payload.id);
    if(!cartItem) return { cart: [...cart, { food: action.payload, quantity: 1 }] }; 
    else {
        cartItem.quantity++;
        return { cart }
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_FOOD_TO_CART:
            return handleAddFoodToCart(state, action);

        case MINUS_FOOD_QUANTITY_ON_CART: 
            return handleMinusFoodQuantity(state, action)

        case REMOVE_FOOD_ON_CART: 
            return { cart: state.cart.filter(cartItem => cartItem.food.id !== action.payload.id) }

        default:
            return state;
    }
}