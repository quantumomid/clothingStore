import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Checkout from "./checkout.component";

const getCartItems = gql`
    {
        cartItems @client
        cartTotal @client
    }
`
const CheckoutPageContainer = () => (
    <Query query={getCartItems}>
        {
            ({ data }) => {
                const { cartItems, cartTotal } = data;
                return <Checkout cartItems={cartItems} total={cartTotal} />
            }
        }
    </Query>
)

export default CheckoutPageContainer;