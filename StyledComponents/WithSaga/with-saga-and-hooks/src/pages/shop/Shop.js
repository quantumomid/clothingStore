import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Route } from 'react-router';
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import { fetchCollectionsStart} from '../../redux/shop/shopActons';
import CollectionContainer from '../collection/CollectionContainer';

const Shop = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())    
    }, [dispatch])

    return(
        <div className="shop-page">
            <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
            <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
        </div>
    )
    
};

export default Shop;