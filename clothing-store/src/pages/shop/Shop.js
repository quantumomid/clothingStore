import React from 'react'
import { shopData } from '../../data/shopData'
import CollectionPreview from '../../components/collection-preview/CollectionPreview'

export default class Shop extends React.Component{
    constructor(props){
        super(props)
        this.state={
            collections: shopData
        }
    }

    render(){

        const collectionPreviewItems = this.state.collections.map(({ id, ...otherCollectionProps }) => {
            return (
                <CollectionPreview key={id} {...otherCollectionProps} />
            )
        })

        return(
            <div>
                {collectionPreviewItems}
            </div>
        )
    }
}