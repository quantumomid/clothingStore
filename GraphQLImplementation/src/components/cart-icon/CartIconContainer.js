import React from "react";
import { graphql } from "react-apollo";
import { flowRight } from 'lodash';
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

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => {
    // console.log(props);
    // const { itemCount } = data;
    return(
        <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} /> 
    )
}

// OLD way (Actually better because with newer/current Apollo versions - move to move away from HOC pattern below)
// const CartIconContainer = () => (
//     <Query query={getItemCount}>
//         {
//             ({ data }) => {
//                 const { itemCount } = data;
//                 return (
//                     <Mutation mutation={toggleCartHidden}> 
//                         { toggleCartHidden => <CartIcon itemCount={itemCount} toggleCartHidden={toggleCartHidden} /> }
//                     </Mutation>
//                 )
//             }
//         }
//     </Query>
// )

// HOC Pattern Method
export default flowRight(
    graphql(getItemCount),
    graphql(toggleCartHidden, { name: "toggleCartHidden" })
)(CartIconContainer);