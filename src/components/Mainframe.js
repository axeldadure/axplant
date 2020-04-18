import React, { useState, useReducer, useEffect } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Homepage from './Homepage';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';

import {reset} from '../data/data-services';

import { cartContext } from './CartContext';


function reducer(cartState, action) {
    switch (action.type) {
        case 'add':
            return cartState.map(c =>
                c.id === action.id ? (c.qt === action.qtLeft ? c : { ...c, qt: c.qt + 1 }) : c
            )
            
        case 'reduce':
            return cartState.map(c => 
                c.id === action.id ? (c.qt > 1 ? { ...c, qt: c.qt - 1 } : c) : c
            )
            
        case 'remove':
            return cartState.filter(c => c.id !== action.id)
            
        case 'empty':
            return [];
        default:
        throw new Error();
    }
}

function Mainframe() {
    
  const [cartCount, setCartCount] = useState(0);

  const cart = [
      {id:1, qt:2},
      {id:3, qt:2},
      {id:5, qt:1}
  ];

  const [cartState, dispatch] = useReducer(reducer, cart);

  const cartValue = {
      cartValues: cart, 
      dispatch
  }

  useEffect(() => {
      let cartCount = 0;
      cartState.map(e => cartCount += e.qt);
      setCartCount(cartCount);
  })

  const resetPlants = async () => {
    await reset();
  }
 
  return (
    <cartContext.Provider value={cartValue}>
        <Router>
        <div className="ct">
            <Navbar bg="dark" expand="lg" variant="dark rowNav">
            <Navbar.Brand>axPlant</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} exact to="/products">Products</Nav.Link>
                <Nav.Link as={NavLink} exact to="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
                <div className="rowNavRight">
                    <Button as={NavLink} 
                    exact 
                    to="/cart" 
                    variant="outline-light"
                    onClick={() => resetPlants()}>Logout</Button>
                    <Button as={NavLink} exact to="/cart" variant="primary plantBtn">Cart ({cartCount})</Button>

                </div>
            </Navbar>
            <Switch>
            <Route path="/products" component={ProductsContainer} />
            <Route exact path="/cart">
                <CartContainer cartValues={cartState} cartCount={cartCount} dispatch={dispatch} />
            </Route>
            <Route exact path="/about" component={CartContainer} />
            <Route exact path="/" component={Homepage} />
            </Switch>
        </div>
        </Router>
    </cartContext.Provider>
  );
}

export default Mainframe;
