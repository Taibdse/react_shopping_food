import { SET_ADMIN } from '../actions/Types';
import { isNotEmpty } from '../../validations/isNotEmpty';

const initialState = {
    admin: {},
    isAuthenticated: false
};



export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN: 
            return { admin: action.payload, isAuthenticated: isNotEmpty(action.payload) }
        default:
            return state;
    }
}