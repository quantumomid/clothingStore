import React from "react";
import { Mutation, Query } from "react-apollo";
import { gql } from "apollo-boost";
import CartIcon from "./cart-icon.component";


const toggleCartHidden = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const getItemCount = gql`
    {
        itemCount @client
    }
`

const CartIconContainer = () => (
    <Query query={getItemCount}>
        {
            ({ data }) => {
                const { itemCount } = data;
                return (
                    <Mutation mutation={toggleCartHidden}> 
                        { toggleCartHidden => <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} /> }
                    </Mutation>
                )
            }
        }
    </Query>
)

export default CartIconContainer;