import { SET_USER, TOGGLE_FORM_USER_LOGIN } from './Types';

export function setUser(user){
    return function(dispatch){
        dispatch({ type: SET_USER, payload: user })
    }
}

export function toggleFormLoginUser(showForm){
    return function(dispatch){
        dispatch({ type: TOGGLE_FORM_USER_LOGIN, payload: showForm })
    }
}