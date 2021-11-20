import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cartActions";
import { AddCartButton, BackgroundImage, CollectionFooterContainer, CollectionItemContainer, NameContainer, PriceContainer } from "./collectionItemStyles";


function CollectionItem({ item, addItem }){
    const { name, price, imageUrl } = item
    return (
        <CollectionItemContainer>
            <BackgroundImage className='image' imageUrl={imageUrl} />
            <CollectionFooterContainer>
                <NameContainer>{name}</ NameContainer>
                <PriceContainer>{price}</ PriceContainer>
            </ CollectionFooterContainer>
            <AddCartButton onClick={() => addItem(item)} inverted>Add to cart</AddCartButton>
        </ CollectionItemContainer>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addItem: item => dispatch(addItem(item))
    }
}

export default connect(null, mapDispatchToProps)(CollectionItem);