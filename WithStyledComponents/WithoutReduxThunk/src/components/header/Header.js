import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
// below is a special syntax for importing SVG in React :o
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import { selectCartHidden } from "../../redux/cart/cartSelectors";
import { selectCurrentUser } from "../../redux/user/userSelectors";
import { createStructuredSelector } from "reselect";

import { HeaderContainer, LogoContainer, OptionLink, OptionsContainer } from "./headerStyles";

function Header({ currentUser, hidden }){

    return(
        <HeaderContainer>

            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/shop'>
                    CONTACT
                </OptionLink>
                { currentUser ? (
                    <OptionLink as="div" onClick={() => auth.signOut()}>SIGN-OUT</OptionLink>
                ) : (
                    <OptionLink to='/signin'>
                    SIGN-IN
                </OptionLink>
                )}
                <CartIcon />
            </ OptionsContainer>
            {
                hidden ? null :
                <CartDropdown />
            }

        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);