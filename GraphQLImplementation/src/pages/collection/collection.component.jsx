import React from 'react';
import CollectionItem from '../../components/collection-item/collection-item.component';
import CollectionItemContainer from '../../components/collection-item/CollectionItemContainer';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {items.map(item => (
          <CollectionItemContainer key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
