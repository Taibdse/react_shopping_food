import { ADD_FOOD_TO_CART, MINUS_FOOD_QUANTITY_ON_CART, REMOVE_FOOD_ON_CART, REMOVE_CART } from './Types';

export function addFoodToCart(food){
    return function(dispatch){
        dispatch({ type: ADD_FOOD_TO_CART, payload: food });
    }
}

export function minusQuanity(food){
    return function(dispatch){
        dispatch({ type: MINUS_FOOD_QUANTITY_ON_CART, payload: food })
    }
}

export function removeCartItem(food){
    return function(dispatch){
        dispatch({ type: REMOVE_FOOD_ON_CART, payload: food })
    }
}

export function removeCart(){
    return function(dispatch){
        dispatch({ type: REMOVE_CART });
    }
}