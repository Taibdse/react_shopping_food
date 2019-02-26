import { SET_SORT_VALUE } from '../actions/Types';

const initialState = {
    sortBy: { name: 'none', price: 'none', discount: 'none', quantity: 'none' },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SORT_VALUE: return { sortBy: action.payload }   
        default:
            return state;
    }
}