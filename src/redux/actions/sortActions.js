import { SET_SORT_VALUE } from './Types';

export function setSort(sort){
    return function(dispatch){
        dispatch({ type: SET_SORT_VALUE, payload: sort })
    }
}