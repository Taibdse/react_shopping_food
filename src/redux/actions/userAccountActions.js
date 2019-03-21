import { SET_USER, TOGGLE_FORM_USER_LOGIN, ADD_USER_ACCOUNT, UPDATE_USER_ACCOUNT, REMOVE_USER_ACCOUNT } from './Types';

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

export function addAccount(account){
    return function(dispatch){
        dispatch({ type: ADD_USER_ACCOUNT, payload: account })
    }
}

export function updateAccount(account){
    return function(dispatch){
        dispatch({ type: UPDATE_USER_ACCOUNT, payload: account })
    }
}

export function removeUserAccount(id){
    return function(dispatch){
        dispatch({ type: REMOVE_USER_ACCOUNT, payload: id })
    }
}


