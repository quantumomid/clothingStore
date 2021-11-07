import './CollectionPreview.scss'
import CollectionItem from '../collection-item/CollectionItem'

export default function CollectionPreview({ title, items }){

    return(
        <div className="collection-preview">
            <h1>{title.toUpperCase()}</h1>
            <div className="preview">
                {items.filter((item, index) => index <4 ).map((item) => {
                    return <CollectionItem key={item.id} item={item} />
                })}
            </div>
        </div>
    )
}