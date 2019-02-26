import { isNotEmpty } from "../validations/isNotEmpty";

export const sortByTextValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    if(sort === 'none') return array;
    let arr = array.map(item => { 
        item[prop].toLowerCase()
        return item;
    })
    .sort((a, b) => {
        if(sort === 'asc') return a[prop] > b[prop] ? 1 : -1;
        return a[prop] < b[prop] ? 1 : -1;
    });
}

export const sortByNumberValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    let arr = array.slice();
    if(sort === 'none') return arr;
    arr.sort((a, b) => {
        return (sort === 'asc') ? a[prop] - b[prop] : b[prop] - a[prop]
    });
}