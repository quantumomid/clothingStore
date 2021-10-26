import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/HomePage'
import Shop from './pages/shop/Shop'
import Header from './components/header/Header';
import SignIn from './pages/sign-in/SignIn';
import { auth } from './firebase/firebase.utils'

class App extends React.Component {
  constructor(){
    super()
    this.state={
      currentUser: null
    }
  }

  //write a method to set subscription to null i.e. unsubscribe i.e. doing this.unsubscribeFromAuth() will close subscription
  unsubscribeFromAuth = null

  componentDidMount(){
    // the onAuthStateChanged method allows us to keep track of user changes - it is essentially a subscriber listening to 
    // the auth
    // This is an open subscription - checking for us continuously while our App is mounted on the DOM
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user})
      console.log(user)
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={Shop} />
          <Route path='/signin' component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
