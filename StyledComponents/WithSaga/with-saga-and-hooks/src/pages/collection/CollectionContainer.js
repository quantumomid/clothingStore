import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from "../../redux/shop/shopSelector";
import WithSpinner from "../../components/with-spinner/WithSpinner";
import Collection from "./Collection";
import { compose } from "redux";

// Give same name to prop i.e. "isLoading" to match the form 
//  as expected in withSpinner
// Also below notice the additional arrow syntax - this is because 
// we need the opposite (i.e. "!") - and createStructuredSelector 
// requires a function not boolean!
const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
})

// export default connect(mapStateToProps)(WithSpinner(Collection))

// Alternative more readable to above (as done in CollectionsOverviewContainer)
const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(Collection);

export default CollectionContainer;