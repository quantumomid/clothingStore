import { withRouter } from 'react-router-dom'
import { BackgroundImage, ContentContainer, ContentSubtitle, ContentTitle, MenuItemContainer } from './menuItemStyles'
// import './MenuItem.scss'

function MenuItem({ title, imageUrl, size, history, linkUrl, match }){
    return(
        <MenuItemContainer size={size} onClick={() => history.push(`${match.url}${linkUrl}`)}>   
            <BackgroundImage imageUrl={imageUrl} className="background-image"/>
            <ContentContainer>
                <ContentTitle>{title.toUpperCase()}</ContentTitle>
                <ContentSubtitle>SHOP NOW</ContentSubtitle>
            </ ContentContainer>
        </MenuItemContainer>
    )
}

export default withRouter(MenuItem)