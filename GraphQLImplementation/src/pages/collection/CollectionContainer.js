import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../../components/spinner/spinner.component";
import CollectionPage from "./collection.component";

const getCollectionByTitle = gql`
    query getCollectionsByTitle($title: String!) {
        getCollectionsByTitle(title: $title) {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

const CollectionPageContainer = ({ match }) => (
    <Query query={getCollectionByTitle} variables={{ title: match.params.collectionId }} >
        {
            ({ loading, data }) => {
                // console.log(data)
                if(loading) return <Spinner />
                // console.log(data)
                const { getCollectionsByTitle } = data
                // console.log(getCollectionsByTitle)
                return <CollectionPage collection={getCollectionsByTitle} />
            }
        }
    </Query>
)

export default CollectionPageContainer;