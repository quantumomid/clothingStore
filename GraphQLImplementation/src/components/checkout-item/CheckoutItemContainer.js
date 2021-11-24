import React from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import Checkout from "./checkout-item.component";

const addItemToCart = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`
const removeItemFromCart = gql`
    mutation RemoveItemFromCart($item: Item!) {
        removeItemFromCart(item: $item) @client
    }
`
const clearItemFromCart = gql`
    mutation ClearItemFromCart($item: Item!) {
        clearItemFromCart(item: $item) @client
    }
`
//Alternative to below is to use compose (but deprecated therefore flowRight from lodash with graphql()) or Mutations Hooks!
const CheckoutItemContainer = (props) => (
    <Mutation mutation={addItemToCart}>
        {
            addItemToCart => (
                <Mutation mutation={removeItemFromCart}>
                    {
                        removeItemFromCart => (
                            <Mutation mutation={clearItemFromCart}>
                                {
                                    clearItemFromCart => <Checkout {...props} addItem={item => addItemToCart({ variables: {item } })} removeItem={item => removeItemFromCart({ variables: {item } })} clearItem={item => clearItemFromCart({ variables: {item } })} />
                                }
                            </ Mutation>
                        )
                    }
                </ Mutation>
            )
        }
    </Mutation>
)

export default CheckoutItemContainer;