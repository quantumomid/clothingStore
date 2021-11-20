import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/CheckoutItem";
import StripeButton from "../../components/stripe-button/StripeButton";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cartSelectors";
import { CheckoutHeaderContainer, CheckoutPageContainer, HeaderBlockContainer, TotalContainer, WarningContainer } from "./checkoutStyles";
// import "./Checkout.scss";

const Checkout = ({ cartItems, total }) => {
    return (
        <CheckoutPageContainer>
            <CheckoutHeaderContainer>
                <HeaderBlockContainer>
                    <span>Product</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Description</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Quantity</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Price</span>
                </HeaderBlockContainer>
                <HeaderBlockContainer>
                    <span>Remove</span>
                </HeaderBlockContainer>
            </ CheckoutHeaderContainer>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
            }
            <TotalContainer>
                <span>
                    TOTAL: £{total}
                </span>
            </ TotalContainer>
            <WarningContainer>
                *Payment is test only - so please use the following card for payments :)*
                <br />
                4242 4242 4242 4242 - Exp: 01/22 (Any Future Date) - CVV: 123 (Any Number)
            </WarningContainer>
            <StripeButton price={total} />
        </CheckoutPageContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(Checkout);