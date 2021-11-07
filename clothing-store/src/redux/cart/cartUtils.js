export const addItemToCart = (cartItems, cartItemToAdd) => {
    // Check if any exisiting cart items are the same as the new one requested to be added
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    if(existingCartItem){
        return cartItems.map(cartItem => {
            if(cartItem.id===cartItemToAdd.id){
                return {
                    ...cartItem, 
                    quantity: cartItem.quantity +1
                }
            }
            return cartItem
        })
    }

    return [
        ...cartItems,
        { ...cartItemToAdd, quantity: 1 }
    ]
}