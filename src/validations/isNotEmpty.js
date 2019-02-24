export const isNotEmpty = val => {
    if(val === null || val === undefined) return false;
    if(typeof val === 'string' && val.trim().length === 0) return false;
    if(typeof val === 'object' && Object.keys(val).length === 0) return false;
    return true;
}