import { ADD_USER_ACCOUNT, SET_USER, TOGGLE_FORM_USER_LOGIN, UPDATE_USER_ACCOUNT, REMOVE_USER_ACCOUNT } from '../actions/Types';
import { isNotEmpty } from '../../validations/isNotEmpty';
import { saveDataToLocalStorage, getInitialUserAccounts, USER_ACCOUNTS_STORAGE_KEY, getInitialCurUserAccount, CURRENT_USER_ACCOUNT_STORAGE_KEY } from '../../services/storage';

const initialAccounts = getInitialUserAccounts();
const initialCurAccount = getInitialCurUserAccount();

const initialState = {
    accounts: initialAccounts,
    curAccount: initialCurAccount,
    isAuthenticated: isNotEmpty(initialCurAccount),
    showFormUserLogin: false
};

function updateUserAccount(state, action){
    let accounts = state.accounts.slice();
    let index = accounts.findIndex(acc => acc.id === action.payload.id);
    if(index > -1) {
        accounts[index] = Object.assign({}, action.payload);
        let curAccount = Object.assign({}, action.payload);  
        saveDataToLocalStorage(accounts, USER_ACCOUNTS_STORAGE_KEY);
        saveDataToLocalStorage(curAccount, CURRENT_USER_ACCOUNT_STORAGE_KEY);
        return { ...state, curAccount, accounts }
    }     
}

function handleRemoveUserAccount(state, action){
    let curAccount = Object.assign(state.curAccount);
    let accounts = [...state.accounts];
    let index = accounts.findIndex(acc => acc.id === action.payload);
    if(index > -1){
        accounts.splice(index, 1);
        saveDataToLocalStorage(accounts, USER_ACCOUNTS_STORAGE_KEY);
        if(curAccount.id === action.payload) {
            curAccount = {};
            saveDataToLocalStorage(curAccount, CURRENT_USER_ACCOUNT_STORAGE_KEY);
        }
    }
    return { ...state, accounts, curAccount, isAuthenticated: isNotEmpty(curAccount) }   
}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER_ACCOUNT: 
            let accounts = [...state.accounts, action.payload]; 
            saveDataToLocalStorage(accounts, USER_ACCOUNTS_STORAGE_KEY);
            return { ...state, accounts }

        case SET_USER: 
            saveDataToLocalStorage(action.payload, CURRENT_USER_ACCOUNT_STORAGE_KEY);
            return { ...state, curAccount: action.payload, isAuthenticated: isNotEmpty(action.payload) }

        case TOGGLE_FORM_USER_LOGIN: 
            return { ...state, showFormUserLogin: action.payload }
        
        case UPDATE_USER_ACCOUNT:
            return updateUserAccount(state, action);

        case REMOVE_USER_ACCOUNT: 
            return handleRemoveUserAccount(state, action);

        default:
            return state;
    }
}

