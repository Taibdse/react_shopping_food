export const isPositiveInt = (val) => {
    if(/^[0]+$/.test(val)) return false;
    return /^\d+$/.test(val);
}