import React from "react";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cartActions";
import { selectCartItemsCount } from "../../redux/cart/cartSelectors";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
// import "./CartIcon.scss";
import { createStructuredSelector } from "reselect";
import { CartIconContainer, ItemCountContainer, ShoppingIcon } from "./cartIconStyles";

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ ItemCountContainer>
        </CartIconContainer>
    )
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
