import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import Shop from "./pages/shop/Shop";
import Header from "./components/header/Header";
import SignIn from "./pages/sign-in/SignIn";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/userActions";
import { selectCurrentUser } from "./redux/user/userSelectors";
import { createStructuredSelector } from "reselect";
import Checkout from "./pages/checkout/Checkout";

class App extends React.Component {

  //write a method to set subscription to null i.e. unsubscribe i.e. doing this.unsubscribeFromAuth() will close subscription
  unsubscribeFromAuth = null

  componentDidMount(){
    // Getting the dispatcher from redux to set current user
    const { setCurrentUser } = this.props;

    // the onAuthStateChanged method allows us to keep track of user changes - it is essentially a subscriber listening to 
    // the auth
    // This is an open subscription - checking for us continuously while our App is mounted on the DOM
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      // this.setState({currentUser: userAuth})
      // console.log(userAuth)

      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          // console.log(snapShot.data())

         
            setCurrentUser({
              id: snapShot.id, 
              ...snapShot.data()
          });
        });
      }
      // if no userAuth, i.e. its null, then set currentUser to null
      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount(){
    //below is important to prevent memory leaks!
    // close the subscription
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route exact path='/checkout' component={Checkout} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignIn />) } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser 
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
