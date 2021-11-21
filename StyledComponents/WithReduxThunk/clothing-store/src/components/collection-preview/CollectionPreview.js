import { withRouter } from "react-router-dom";
import CollectionItem from '../collection-item/CollectionItem'
import { CollectionPreviewContainer, PreviewContainer, TitleContainer } from './collectionPreviewStyles'

const CollectionPreview = ({ title, items, history, match, routeName }) => (
        <CollectionPreviewContainer>
            <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>{title.toUpperCase()}</TitleContainer>
            <PreviewContainer>
                {items.filter((item, index) => index <4 ).map((item) => {
                    return <CollectionItem key={item.id} item={item} />
                })}
            </PreviewContainer>
        </CollectionPreviewContainer>
    )

export default withRouter(CollectionPreview);