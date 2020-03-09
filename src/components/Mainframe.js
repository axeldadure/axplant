import React, { useState, useReducer } from 'react';
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
import { cartContext } from './CartContext';


function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {
                cart: state.cart.map(c =>
                    c.id === action.id ? { ...c, qt: c.qt + 1 } : c
                )
            }
        case 'remove':
            return {
                cart: state.cart.map(c =>
                    c.id === action.id ? { ...c, qt: c.qt - 1 } : c
                )
            }
        default:
        throw new Error();
    }
}

function Mainframe() {

  const cart = [
      {id:1, qt:2},
      {id:3, qt:2},
      {id:5, qt:1}
  ];

  const [state, dispatch] = useReducer(reducer, {cart:cart, cartCount:0});

  const cartValue = {
      cartPlantIds: cart, 
      dispatch: dispatch
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
                    <Button as={NavLink} exact to="/cart" variant="outline-light">Logout</Button>
                    <Button as={NavLink} exact to="/cart" variant="primary plantBtn">Cart ({cart.length})</Button>

                </div>
            </Navbar>
            <Switch>
            <Route path="/products" component={ProductsContainer} />
            <Route exact path="/cart">
                <CartContainer cartPlantIds={state.cart}/>
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
