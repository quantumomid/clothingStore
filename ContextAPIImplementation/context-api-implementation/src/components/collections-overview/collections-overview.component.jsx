import React, { useContext } from 'react';
import CollectionsContext from '../../contexts/collections/collectionsContext';
import CollectionPreview from '../collection-preview/collection-preview.component';
import './collections-overview.styles.scss';

const CollectionsOverview = () => {
  const collectionsObject = useContext(CollectionsContext);
  const collections = Object.keys(collectionsObject).map(key => collectionsObject[key])
  return (
    <div className='collections-overview'>
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  )
};

export default CollectionsOverview;
