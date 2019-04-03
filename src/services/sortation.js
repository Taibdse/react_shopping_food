import { isNotEmpty } from "../validations/isNotEmpty";
import { getUnitPrice } from './payment';

export const sortByTextValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    if(sort === 'none') return array.slice();
    return array.map(item => { 
        item[prop].toLowerCase()
        return item;
    })
    .sort((a, b) => {
        if(sort === 'asc') return a[prop] > b[prop] ? 1 : -1;
        return a[prop] < b[prop] ? 1 : -1;
    });
}

export const sortByDiscoutedPrice = (array, sort) => {
    if(!isNotEmpty(array)) return [];
    let arr = array.slice();
    if(sort === 'none') return arr;
    return arr.sort((a, b) => {
        const aPrice = getUnitPrice(a.price, a.discount);
        const bPrice = getUnitPrice(b.price, b.discount);
        return (sort === 'asc') ? aPrice - bPrice : bPrice - aPrice;
    });
}

export const sortByNumberValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    let arr = array.slice();
    if(sort === 'none') return arr;
    return arr.sort((a, b) => {
        return (sort === 'asc') ? a[prop] - b[prop] : b[prop] - a[prop]
    });
}