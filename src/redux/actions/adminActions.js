import { SET_ADMIN } from './Types';

export function setAdmin(admin){
    return function(dispatch){
        dispatch({ type: SET_ADMIN, payload: admin })
    }
}