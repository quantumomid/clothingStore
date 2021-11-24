import { gql } from "apollo-boost";
import { addItemToCart, getCartItemCount, getTotalForCart, removeItemFromCart, clearItemFromCart } from "./cart.utils";

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }

    extend type DateTime {
        nanoseconds: Int!
        seconds: Int!
    }
    
    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: DateTime!
    }

    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemFromCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
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

const getCartTotal = gql`
    {
        cartTotal @client
    }
`

const getCurrentUser = gql`
    {
        currentUser @client
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

            updateCartItemProperties(cache, newCartItems);

            return newCartItems;
        },

        removeItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: getCartItems });

            const newCartItems = removeItemFromCart(cartItems, item)

            updateCartItemProperties(cache, newCartItems);

            return newCartItems;
        },
        
        clearItemFromCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({ query: getCartItems });

            const newCartItems = clearItemFromCart(cartItems, item)

            updateCartItemProperties(cache, newCartItems);

            return newCartItems;
        },

        setCurrentUser: (_root, { user }, { cache }) => {
            
            cache.writeQuery({
                query: getCurrentUser,
                data: { currentUser: user }
            })

            return user;
        }
    }
}

const updateCartItemProperties = (cache, newCartItems) => {
    cache.writeQuery({
        query: getItemCount,
        data: { itemCount: getCartItemCount(newCartItems) }
    })

    cache.writeQuery({
        query: getCartTotal,
        data: { cartTotal: getTotalForCart(newCartItems) }
    })

    cache.writeQuery({
        query: getCartItems,
        data: { cartItems: newCartItems }
    })
}