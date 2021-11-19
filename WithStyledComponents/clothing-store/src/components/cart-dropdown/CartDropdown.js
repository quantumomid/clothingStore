import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cartSelectors";
import { withRouter } from "react-router";
import CartItem from "../cart-item/CartItem";
import CustomButton from "../custom-button/CustomButton";
// import "./CartDropdown.scss";
import { toggleCartHidden } from "../../redux/cart/cartActions";
import { CartDropdownButton, CartDropdownContainer, CartItemsContainer, EmptyMessageContainer } from "./cartDropdownStyles";

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <CartDropdownContainer>
        <CartItemsContainer>
        {   cartItems.length ? (
            cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />))
            : <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        }
        </ CartItemsContainer>
        <CartDropdownButton onClick={() => {
            history.push('/checkout')
            dispatch(toggleCartHidden())   
        }}>GO TO CHECKOUT</CartDropdownButton>
    </ CartDropdownContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

// Note: the order of wrapping is important i.e. to pass the "connected" component
// into withRouter so that the correct end state of CartDropdown has access to the 
// various router properties we desire
export default withRouter(connect(mapStateToProps)(CartDropdown));

// Also note when the second parameter to connect() is empty then connect automatically
// providers dispatch() in the props for you to use! 