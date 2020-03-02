import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {cartContext} from "./CartContext";

function CartContainer() {
    return (
        <cartContext.Consumer>
            {({cartQte, updateCart}) => (
                <Container>
                    <Row>
                        <Col><h2 onClick={updateCart}>You have {cartQte} items in your cart</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={12}></Col>
                    </Row>
                </Container>
            )}
        </cartContext.Consumer>
    );
}

export default CartContainer;