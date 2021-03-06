import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import Spinner from "../spinner/spinner.component";
import CollectionsOverview from "./collections-overview.component";

const getCollections = gql`
{
    collections {
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

const CollectionsOverviewContainer = () => (
    <Query query={getCollections}>
        {
            ({ loading, error, data }) => {
                console.log({ loading });
                console.log({ error });
                console.log({ data });

                if (loading) return <Spinner />;
                return <CollectionsOverview collections={data.collections} />                
            }
        }
    </Query>
)

export default CollectionsOverviewContainer;