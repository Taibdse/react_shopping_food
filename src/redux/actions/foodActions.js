import uuid from 'uuid';
import { NEW_FOOD, DELETE_FOOD, EDIT_FOOD, UPDATE_FOOD, FILTER_FOODS, TOGGLE_FOOD_FORM, CLEAR_FORM_FOOD } from './Types';

export function addNewFood(food){
    return function(dispatch){
        food.id = uuid.v4();
        dispatch({ type: NEW_FOOD, payload: food })
    }
}

export function clearForm(){
    return function(dispatch){
        dispatch({ type: CLEAR_FORM_FOOD })
    }
}

export function deleteFood(id){
    return function(dispatch){
        dispatch({ type: DELETE_FOOD, payload: id })
    }
}

export function editFood(food){
    return function(dispatch){
        dispatch({ type: EDIT_FOOD, payload: food })
    }
}

export function updateFood(food){
    return function(dispatch){
        dispatch({ type: UPDATE_FOOD, payload: food })
    }
}

export function filterFoods(filterObj){
    return function(dispatch){
        dispatch({ type: FILTER_FOODS, payload: filterObj });
    }
}

export function toggleForm(showForm){
    return function(dispatch){
        dispatch({ type: TOGGLE_FOOD_FORM, payload: showForm });
    }
}
