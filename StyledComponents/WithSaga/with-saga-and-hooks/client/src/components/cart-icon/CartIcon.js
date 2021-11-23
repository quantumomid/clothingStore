import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cartActions";
import { selectCartItemsCount } from "../../redux/cart/cartSelectors";
import { CartIconContainer, ItemCountContainer, ShoppingIcon } from "./cartIconStyles";

const CartIcon = () => {
    const itemCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();
    return (
        <CartIconContainer onClick={() => dispatch(toggleCartHidden())}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ ItemCountContainer>
        </CartIconContainer>
    )
}

export default CartIcon;
