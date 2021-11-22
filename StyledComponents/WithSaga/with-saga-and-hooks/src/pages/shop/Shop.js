import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import { fetchCollectionsStart} from '../../redux/shop/shopActons';
import CollectionContainer from '../collection/CollectionContainer';

const Shop = ({ match, fetchCollectionsStart }) => {

    useEffect(() => {
        fetchCollectionsStart();
    }, [fetchCollectionsStart])

    return(
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
        </div>
    )
    
};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(Shop);