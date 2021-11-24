import { gql } from "apollo-boost";
import { addItemToCart, getCartItemCount } from "./cart.utils";

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
    }
`;

const getCardHidden = gql`
    {
        cartHidden @client
    }
`

const getCartItems = gql`
    {
        cartItems @client
    }
`

const getItemCount = gql`
    {
        itemCount @client
    }
`

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {

            const { cartHidden } = cache.readQuery({
                query: getCardHidden
            })

            cache.writeQuery({
                query: getCardHidden,
                data: { cartHidden: !cartHidden }
            })

            return !cartHidden
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: getCartItems });

            const newCartItems = addItemToCart(cartItems, item)

            cache.writeQuery({
                query: getItemCount,
                data: { itemCount: getCartItemCount(newCartItems) }
            })

            cache.writeQuery({
                query: getCartItems,
                data: { cartItems: newCartItems }
            })

            return newCartItems;
        }
    }
}