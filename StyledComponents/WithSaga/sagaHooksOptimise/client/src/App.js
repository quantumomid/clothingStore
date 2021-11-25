import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header/Header";
import { selectCurrentUser } from "./redux/user/userSelectors";
import { checkUserSession } from "./redux/user/userActions";
import { GlobalStyle } from "./globalStyles";
import Spinner from "./components/spinner/Spinner";
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";

const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const Shop = lazy(() => import("./pages/shop/Shop"));
const Checkout = lazy(() => import("./pages/checkout/Checkout"));
const SignIn = lazy(() => import("./pages/sign-in/SignIn"));

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
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner/>}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={Shop} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/signin' render={() => currentUser ? (<Redirect to="/" />) : (<SignIn />) } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

export default App;