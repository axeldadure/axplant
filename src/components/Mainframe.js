import React, { useState, useEffect } from 'react';
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

function Mainframe() {

  const [cart, setCart] = useState(1);

  const updateCart = () => {
    setCart(cart+1);
  }
  const cartValue = {
      cartQte: cart, 
      updateCart: updateCart
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
                    <cartContext.Consumer>
                        {({cartQte, updateCart}) => {
                            return (
                                <Button as={NavLink} exact to="/cart" variant="primary plantBtn">Cart ({cart})</Button>
                            );
                        }}
                    </cartContext.Consumer>
                </div>
            </Navbar>
            <Switch>
            <Route path="/products" component={ProductsContainer} />
            <Route exact path="/cart" component={CartContainer} />
            <Route exact path="/about" component={CartContainer} />
            <Route exact path="/" component={Homepage} />
            </Switch>
        </div>
        </Router>
    </cartContext.Provider>
  );
}

export default Mainframe;
