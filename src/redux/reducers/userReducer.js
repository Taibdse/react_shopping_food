import { TOGGLE_FORM_USER_LOGIN } from '../actions/Types';

const initialState = {
    showFormUserLogin: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TOGGLE_FORM_USER_LOGIN: 
            return { ...state, showFormUserLogin: action.payload }
        default:
            return state;
    }
}