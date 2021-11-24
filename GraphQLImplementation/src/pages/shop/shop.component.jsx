import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionsOverviewContainer from '../../components/collections-overview/collectionsOverviewContainer';
import CollectionPage from '../collection/collection.component';

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
