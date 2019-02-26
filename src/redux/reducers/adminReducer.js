import { SET_ADMIN } from '../actions/Types';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { getInitialAdmin, ADMIN_STORAGE_KEY, saveDataToSessionStorage } from '../../services/storage';

const initialAdmin = getInitialAdmin();

const initialState = {
    admin: initialAdmin,
    isAuthenticated: isNotEmpty(initialAdmin)
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ADMIN: 
            saveDataToSessionStorage(action.payload, ADMIN_STORAGE_KEY);
            return { admin: action.payload, isAuthenticated: isNotEmpty(action.payload) }
        default:
            return state;
    }
}