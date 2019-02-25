import { SET_USER, TOGGLE_FORM_USER_LOGIN } from '../actions/Types';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { getInitialUser, saveDataToLocalStorage, USER_STORAGE_KEY } from '../../services/storage';

const initialUser = getInitialUser();

const initialState = {
    user: initialUser,
    isAuthenticated: isNotEmpty(initialUser),
    showFormUserLogin: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER: 
            saveDataToLocalStorage(action.payload, USER_STORAGE_KEY);
            return { ...state, user: action.payload, isAuthenticated: isNotEmpty(action.payload) }
        case TOGGLE_FORM_USER_LOGIN: 
            return { ...state, showFormUserLogin: action.payload }
        default:
            return state;
    }
}