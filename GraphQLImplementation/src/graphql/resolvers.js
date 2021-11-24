import { gql } from "apollo-boost";

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`;

const getCardHidden = gql`
    {
        cartHidden @client
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
        }
    }
}