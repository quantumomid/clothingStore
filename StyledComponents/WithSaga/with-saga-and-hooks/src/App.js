import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignIn from "./pages/sign-in/SignIn";
import { selectCurrentUser } from "./redux/user/userSelectors";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/Checkout";
import { checkUserSession } from "./redux/user/userActions";

const App = ({ checkUserSession, currentUser }) => {

  useEffect(() => {
    checkUserSession();
    // its fine to pass checkUserSession as it is coming from redux and not a parent component
  }, [checkUserSession])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to="/" />) : (<SignIn />) } />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser 
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
