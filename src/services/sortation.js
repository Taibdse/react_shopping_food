import { isNotEmpty } from "../validations/isNotEmpty";

export const sortByTextValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    if(sort === 'none') return array;
    let arr = array.map(item => { 
        item[prop].toLowerCase()
        return item;
    })
    .sort((a, b) => a[prop] > b[prop] ? 1 : -1);
    return (sort === 'asc') ? arr : arr.reverse();
}

export const sortByNumberValue = (array, prop, sort) => {
    if(!isNotEmpty(array)) return [];
    if(sort === 'none') return array;
    array.sort((a, b) => a[prop] - b[prop]);
    return (sort === 'asc') ? array : array.reverse();
}