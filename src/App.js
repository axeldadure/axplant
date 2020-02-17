import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Homepage from './components/Homepage';
import ProductsContainer from './components/ProductsContainer';
import CartContainer from './components/CartContainer';

import './App.css';


function App() {
  return (
    <Router>
      <div className="mainCt">
        <header>
          <div className="headerLeft">
            <span className="logo">axPlant</span>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/products">Products</NavLink>
          </div>
          <div className="headerRight">
            <NavLink exact to="/cart">Cart</NavLink>
          </div>
        </header>
        <div className="ct">
          <Switch>
            <Route exact path="/products" component={ProductsContainer} />
            <Route exact path="/cart" component={CartContainer} />
            <Route exact path="/" component={Homepage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
