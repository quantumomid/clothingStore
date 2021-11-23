import React from "react"
import CollectionPreview from "../../components/collection-preview/CollectionPreview"
import { useSelector } from "react-redux";
import { selectShopCollectionsForPreview } from "../../redux/shop/shopSelector";
import { CollectionsOverviewContainer } from "./collectionOverviewStyles";

const CollectionsOverview = () => {
    const collections = useSelector(selectShopCollectionsForPreview);
    // console.log(collections);
    const collectionPreviewItems = collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)

    return(
        <CollectionsOverviewContainer>
            {collectionPreviewItems}
        </CollectionsOverviewContainer>
    )
};

export default CollectionsOverview;