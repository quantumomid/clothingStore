import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import App from "./App";

const getCurrentUser = gql`
    {
        currentUser @client
    }
`

const setCurrentUser = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const AppContainer = () => (
    <Query query={getCurrentUser}>
        {
            ({ data }) => {
                const { currentUser } = data;
                return (
                    <Mutation mutation={setCurrentUser}>
                        {
                            setCurrentUser => <App currentUser={currentUser} setCurrentUser={ user => setCurrentUser({ variables: { user } }) }/>
                        }
                    </Mutation>
                )
            }
        }
    </Query>
)

export default AppContainer;