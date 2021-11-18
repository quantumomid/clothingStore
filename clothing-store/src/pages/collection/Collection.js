import "./Collection.scss";

import CollectionItem from "../../components/collection-item/CollectionItem";
import { connect } from "react-redux";
import { selectShopCollection } from "../../redux/shop/shopSelector";

const Collection = ({ collection }) => {
    // console.log(match.params.collectionId);
    console.log(collection);
    return (
        <div className="collection-page">
            <h2>COLLECTION PAGE</h2>
        </div>
    )
}

// Second parameter here is the own props of the component i.e. Collection
// This is very handy as it will allow us access to "match" to use the collectionId!
const mapStateToProps = (state, ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(Collection);