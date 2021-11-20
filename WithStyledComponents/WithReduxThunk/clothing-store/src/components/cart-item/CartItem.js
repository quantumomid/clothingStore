// import "./CartItem.scss";

import { CartItemContainer, CartItemImage, ItemDetailsContainer } from "./cartItemStyles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
    return (
        <CartItemContainer>
            <CartItemImage src={imageUrl} alt="item" />
            <ItemDetailsContainer>
                <span>{name}</span>
                <span>{quantity} x £{price}</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem;