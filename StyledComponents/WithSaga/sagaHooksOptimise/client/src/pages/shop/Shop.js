import React, { useEffect, lazy, Suspense } from 'react'
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { fetchCollectionsStart} from '../../redux/shop/shopActons';
import Spinner from "../../components/spinner/Spinner";

const CollectionsOverviewContainer = lazy(() => import("../../components/collections-overview/CollectionsOverviewContainer"));
const CollectionContainer = lazy(() => import("../collection/CollectionContainer"));

const Shop = ({ match }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())    
    }, [dispatch])

    return(
        <div className="shop-page">
            <Suspense fallback={<Spinner />}>
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
            </Suspense>
        </div>
    )
};

export default Shop;