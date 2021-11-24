import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import CartIcon from "./cart-icon.component";


const toggleCartHidden = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const CartIconContainer = () => (
    <Mutation mutation={toggleCartHidden}> 
        { toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden} /> }
    </Mutation>
)

export default CartIconContainer;