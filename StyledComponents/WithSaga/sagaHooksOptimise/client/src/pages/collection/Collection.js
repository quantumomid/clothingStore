import CollectionItem from "../../components/collection-item/CollectionItem";
import { useSelector } from "react-redux";
import { selectShopCollection } from "../../redux/shop/shopSelector";
import { CollectionItemsContainer, CollectionPageContainer, CollectionTitle } from "./collectionStyles";
import { useParams } from "react-router-dom";

const Collection = () => {
    const { collectionId } = useParams();
    // console.log(collectionId);
    const { title, items } = useSelector(selectShopCollection(collectionId));    

    return (
        <CollectionPageContainer>
            <CollectionTitle>{ title }</CollectionTitle>
            <CollectionItemsContainer>
                { items.map(item => <CollectionItem key={item.id} item={item} />) }
            </CollectionItemsContainer>
        </CollectionPageContainer>
    )
}

export default Collection;