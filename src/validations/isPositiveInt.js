import { isNotEmpty } from './isNotEmpty';

export const isPositiveInt = (val) => {
    return /^\d+$/.test(val);
}