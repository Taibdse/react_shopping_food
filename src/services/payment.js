export const getUnitPrice = (price, discount) =>  Math.round(price / 100 * (100 - discount));

export const getTotalPaymentCart = (cart) => {
    return cart.reduce((sum, cartItem) => {
        let unitPrice = getUnitPrice(cartItem.food.price, cartItem.food.discount);
        return sum += unitPrice * cartItem.quantity;
    }, 0);
}