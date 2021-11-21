import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsFetching } from "../../redux/shop/shopSelector";
import WithSpinner from "../with-spinner/WithSpinner";
import CollectionsOverview from "./CollectionsOverview";

// Give same name to prop i.e. "isLoading" to match the form 
//  as expected in withSpinner
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
})

// This is a simpler alternative to the below
// export default connect(mapStateToProps)(WithSpinner(CollectionsOverview))

// Alternative to above is to use the COMPOSE function from redux which 
// essentially allows us to curry the different things HOC being applied 
// to CollectionsOverview
// Benefit is that this makes it slightly more readable than ABOVE
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;