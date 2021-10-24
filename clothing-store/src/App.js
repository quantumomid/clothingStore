import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/HomePage'
import Shop from './pages/shop/Shop'
import Header from './components/header/Header';
import SignIn from './pages/sign-in/SignIn';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={Shop} />
        <Route path='/signin' component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
