import React from "react"
import CollectionPreview from "../../components/collection-preview/CollectionPreview"
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectShopCollectionsForPreview } from "../../redux/shop/shopSelector";
import "./CollectionsOverview.scss";

const CollectionsOverview = ({ collections }) => {
    console.log(collections);
    const collectionPreviewItems = collections.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)

    return(
        <div className="collections-overview">
            {collectionPreviewItems}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    collections: selectShopCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);