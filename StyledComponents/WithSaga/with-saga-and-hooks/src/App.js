import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignIn from "./pages/sign-in/SignIn";
import { selectCurrentUser } from "./redux/user/userSelectors";
import Checkout from "./pages/checkout/Checkout";
import { checkUserSession } from "./redux/user/userActions";

const App = () => {

  // the below updates whenever the underlying state that the selector is
  // connected to also changes
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
    // Below still same as giving an empty array - i.e. will just run once on mount
    // because of us saving useDispatch to a variable - on re-renders react will not 
    // reinitialise another dispatch as it will see one already exists! :)
  }, [dispatch])

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

export default App;