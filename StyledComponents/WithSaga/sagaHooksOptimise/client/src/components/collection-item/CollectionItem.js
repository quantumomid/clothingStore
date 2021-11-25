import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cart/cartActions";
import { AddCartButton, BackgroundImage, CollectionFooterContainer, CollectionItemContainer, NameContainer, PriceContainer } from "./collectionItemStyles";


function CollectionItem({ item }){
    const dispatch = useDispatch();
    const { name, price, imageUrl } = item
    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</ NameContainer>
                <PriceContainer>{price}</ PriceContainer>
            </ CollectionFooterContainer>
            <AddCartButton onClick={() => dispatch(addItem(item))} inverted>Add to cart</AddCartButton>
        </ CollectionItemContainer>
    )
}

export default CollectionItem;