import './CollectionItem.scss'

export default function CollectionItem({ name, imageUrl, price }){
    return (
        <div className="collection-item">
            <div className="image" style={{backgroundImage: `url(${imageUrl})`}} />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
        </div>
    )
}