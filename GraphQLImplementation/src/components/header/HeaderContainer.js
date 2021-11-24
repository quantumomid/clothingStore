import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Header from "./header.component";

const getCardHidden = gql`
    {
        cartHidden @client
    }
`

const HeaderContainer = () => (
    <Query query={getCardHidden}>
        {
            ({ data }) => {
                const { cartHidden } = data;
                return <Header hidden={cartHidden} />
            }
        }
    </Query>
)

export default HeaderContainer;