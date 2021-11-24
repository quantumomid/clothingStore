import React from 'react';
import { Route } from 'react-router-dom';
import CollectionsOverviewContainer from '../../components/collections-overview/CollectionsOverviewContainer';
import CollectionPageContainer from '../collection/CollectionContainer';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
  </div>
);

export default ShopPage;
