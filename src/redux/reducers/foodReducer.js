import {
    FETCH_FOODS, DELETE_FOOD, EDIT_FOOD, NEW_FOOD, UPDATE_FOOD, CLEAR_FORM_FOOD, FILTER_FOODS, TOGGLE_FOOD_FORM
} from '../actions/Types';
import { getInitialFoodsList } from '../../services/storage';
import { saveDataToLocalStorage, FOOD_LIST_STORAGE_KEY } from '../../services/storage';


const filteredObj = {
    name: '',
    priceFrom: 0,
    priceTo: 0,
    quantityFrom: 0, 
    quantityTo: 0
}

const initialState = {
    foods: getInitialFoodsList(),
    filteredObj,
    food: {},
    loading: false,
    showForm: false
}

export default function (state = initialState, action) {
    let foods = [];
    switch (action.type) {
        case FETCH_FOODS:
            return { ...state, foods: action.payload };
        
        case NEW_FOOD: 
            foods = [action.payload, ...state.foods];
            saveDataToLocalStorage(foods, FOOD_LIST_STORAGE_KEY);
            return { ...state, foods: foods.slice(), food: {} }

        case DELETE_FOOD: 
            foods = state.foods.filter(food => food.id !== action.payload);
            saveDataToLocalStorage(foods, FOOD_LIST_STORAGE_KEY);
            return { ...state, foods: foods.slice(), food: {} }

        case EDIT_FOOD: 
            return { ...state, food: action.payload }

        case CLEAR_FORM_FOOD: 
            return { ...state, food: {} }

        case UPDATE_FOOD: 
            foods = state.foods.map(food => {
                if(food.id === action.payload.id) return action.payload;
                    return food;
                })
            saveDataToLocalStorage(foods, FOOD_LIST_STORAGE_KEY);
            return { ...state, foods: foods.slice(), food: {} }

        case FILTER_FOODS: return { ...state, filteredObj: action.payload };

        case TOGGLE_FOOD_FORM: return { ...state, showForm: action.payload }

        default:
            return state;
    }
    
}