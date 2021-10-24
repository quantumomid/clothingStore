import './CollectionPreview.scss'

export default function CollectionPreview({ title, items }){

    return(
        <div className="collection-preview">
            <h1>{title.toUpperCase()}</h1>
            <div className="preview">
                {items.filter((item, index) => index <4 ).map(({ name, id }) => {
                    return <div key={id} >{name}</div>
                })}
            </div>
        </div>
    )
}