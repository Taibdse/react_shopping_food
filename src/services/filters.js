import { isNotEmpty } from '../validations/isNotEmpty';

export const filterByRangeNumber = (array, prop, from, to) => {
    if(!isNotEmpty(array)) return [];
    if(!isNotEmpty(from) || !isNotEmpty(to) || (from === 0 && to === 0)) return array;
    from = Number(from);
    to = Number(to);
    if(from > to) return [];
    return array.filter(item => {
        return item[prop] >= from && item[prop] <= to;
    })
}

export const filterBySearchValue = (array, prop, value) => {
    if(!isNotEmpty(array)) return [];
    if(!isNotEmpty(value)) return array;
    return array.filter(item => {
        return item[prop].toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
}