import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Header from "./header.component";

const getClientData = gql`
    {
        cartHidden @client
        currentUser @client
    }
`

const HeaderContainer = () => (
    <Query query={getClientData}>
        {
            ({ data }) => {
                const { cartHidden, currentUser } = data;
                return <Header hidden={cartHidden} currentUser={currentUser} />
            }
        }
    </Query>
)

export default HeaderContainer;