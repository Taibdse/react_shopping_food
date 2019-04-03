import { isNotEmpty } from '../validations/isNotEmpty';
import { getUnitPrice } from './payment';
import { isPositiveNum } from '../validations/isPositiveInt';

export const filterByRangeNumber = (array, prop, from, to) => {
    if(!isNotEmpty(array)) return [];
    if(!isPositiveNum(from) || !isPositiveNum(to)) return array;
    from = Number(from);
    to = Number(to);
    if(from > to) return [];
    return array.filter(item => {
        return item[prop] >= from && item[prop] <= to;
    })
}

export const filterByDiscountedPrice = (array, from, to) => {
    if(!isNotEmpty(array)) return [];
    if(!isPositiveNum(from) || !isPositiveNum(to)) return array;
    from = Number(from);
    to = Number(to);
    if(from > to) return [];
    return array.filter(item => {
        const discountedPrice = getUnitPrice(item.price, item.discount);
        return discountedPrice >= from && discountedPrice <= to;
    })
}

export const filterBySearchValue = (array, prop, value) => {
    if(!isNotEmpty(array)) return [];
    if(!isNotEmpty(value)) return array;
    return array.filter(item => {
        return item[prop].toLowerCase().indexOf(value.toLowerCase()) > -1;
    })
}