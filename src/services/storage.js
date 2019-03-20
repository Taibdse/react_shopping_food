import { isUser } from '../auth/isUser';
import { isAdmin } from '../auth/isAdmin';
import { isNotEmpty } from '../validations/isNotEmpty';

import { userAccounts } from '../data/users';
import { foods } from '../data/foods';

export const FOOD_LIST_STORAGE_KEY = 'FOOD_LIST_STORAGE_KEY';
export const CART_STORAGE_KEY = 'CART_STORAGE_KEY';
export const CARTS_STORAGE_KEY = 'CARTS_STORAGE_KEY';
export const ORDERED_ITEMS_STORAGE_KEY = 'ORDERED_ITEMS_STORAGE_KEY';
export const CURRENT_USER_ACCOUNT_STORAGE_KEY = 'CURRENT_USER_ACCOUNT_STORAGE_KEY';
export const ADMIN_STORAGE_KEY = 'ADMIN_STORAGE_KEY';
export const USER_ACCOUNTS_STORAGE_KEY = 'USER_ACCOUNTS_STORAGE_KEY';

export function saveDataToLocalStorage(data, key){
    localStorage.setItem(key, JSON.stringify(data));
}

export function saveDataToSessionStorage(data, key){
    sessionStorage.setItem(key, JSON.stringify(data));
}

export function getInitialFoodsList(){
    let json = localStorage.getItem(FOOD_LIST_STORAGE_KEY);
    if(!json) {
        saveDataToLocalStorage(foods, FOOD_LIST_STORAGE_KEY)
        return foods;
    }
    try {
        let foodList = JSON.parse(json);
        return foodList;
    } catch (error) {
        console.log(error);
        return foods;
    }
}

export function getInitialCart(){
    let json = localStorage.getItem(CART_STORAGE_KEY);
    if(!json) return {};
    try {
        let cart = JSON.parse(json);
        return cart;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export function getInitialCarts(){
    let json = localStorage.getItem(CARTS_STORAGE_KEY);
    if(!json) return [];
    try {
        let carts = JSON.parse(json);
        return carts;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export function getInitialOrders(){
    let json = localStorage.getItem(ORDERED_ITEMS_STORAGE_KEY);
    if(!json) return [];
    try {
        let orders = JSON.parse(json);
        return orders;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function getInitialCurUserAccount(){
    let json = localStorage.getItem(CURRENT_USER_ACCOUNT_STORAGE_KEY);
    if(!json) return {};
    try {
        let user = JSON.parse(json);
        let account = isUser(user.username, user.password);
        if(isNotEmpty(account)) return user;
        return {};
    } catch (error) {
        console.log(error);
        return {};
    }
}

export function getInitialAdmin(){
    let json = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    if(!json) return {};
    try {
        let admin = JSON.parse(json);
        if(isAdmin(admin.username, admin.password)) return admin;
        return {};
    } catch (error) {
        console.log(error);
        return {};
    }
}

export function getInitialUserAccounts(){
    let json = localStorage.getItem(USER_ACCOUNTS_STORAGE_KEY);
    if(!json) {
        saveDataToLocalStorage(userAccounts, USER_ACCOUNTS_STORAGE_KEY);
        return userAccounts;
    }
    try {
        let accounts = JSON.parse(json);
        return accounts
    } catch (error) {
        console.log(error);
        return [];
    }
}