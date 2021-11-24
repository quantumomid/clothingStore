import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import CartDropdown from "./cart-dropdown.component";

const toggleCartHidden = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const getCartItems = gql`
    {
        cartItems @client
    }
`

const CartDropdownContainer = () => (
    <Mutation mutation={toggleCartHidden}>
        {
            toggleCartHidden => (
                <Query query={getCartItems}>
                    {
                        ({ data }) => {
                            const { cartItems } = data;
                            return <CartDropdown toggleCartHidden={toggleCartHidden} cartItems={cartItems} />
                        }
                    }
                </Query>
            )
        }
    </Mutation>
)

export default CartDropdownContainer;