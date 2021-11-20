import React from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { createStructuredSelector } from 'reselect';
import CollectionsOverview from '../../components/collections-overview/CollectionsOverview';
import WithSpinner from '../../components/with-spinner/WithSpinner';
import { fetchCollectionsStartAsync} from '../../redux/shop/shopActons';
import { selectIsCollectionsFetching, selectIsCollectionsLoaded } from '../../redux/shop/shopSelector';
import Collection from '../collection/Collection';

// Creates a HOC from Collections overview that shows the spinner while loading 
// and the actual component when not loading
const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(Collection);

class Shop extends React.Component{

    async componentDidMount(){
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    render(){
        const { match, isCollectionsFetching, isCollectionsLoaded } = this.props;
    // console.log(match);
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={ (props) => <CollectionOverviewWithSpinner isLoading={isCollectionsFetching} {...props} />} />
                <Route path={`${match.path}/:collectionId`} render={ (props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} /> } />
            </div>
        )
    }
};

const mapStateToProps = createStructuredSelector({
    isCollectionsFetching: selectIsCollectionsFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);