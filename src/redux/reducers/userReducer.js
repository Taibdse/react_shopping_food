import { SET_USER, TOGGLE_FORM_USER_LOGIN } from '../actions/Types';
import { isNotEmpty } from '../../validations/isNotEmpty';

const initialState = {
    user: {},
    isAuthenticated: false,
    showFormUserLogin: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: 
            return { ...state, user: action.payload, isAuthenticated: isNotEmpty(action.payload) }
        case TOGGLE_FORM_USER_LOGIN: 
            return { ...state, showFormUserLogin: action.payload }
        default:
            return state;
    }
}