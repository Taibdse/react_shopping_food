export const isNormalInteger = (str) => {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

// function isNormalInteger(str) {
//     return /^\+?(0|[1-9]\d*)$/.test(str);
// }

// export const isNum = val => {
//     return !isNaN(val)
// }

// export const isPositiveInt = val => {
//     const regex =  /(^[0]*\d+$)/;
//     if(!regex.test(val)) return false;
//     return !(Number(val) === 0);
// }

export const isPositiveInt = (n) => {
    return n >>> 0 === parseFloat(n);
}

export const isPositiveNum = val => {
    if(isNaN(val)) return false;
    return Number(val) > 0;
}
