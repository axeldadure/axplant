import React, { useState, useEffect } from 'react';
import {cartContext} from "./CartContext";
import {useParams, NavLink} from "react-router-dom";
import {Image, Row, Col, Card, Button, ListGroup, ListGroupItem, Form, InputGroup, Modal} from 'react-bootstrap';
import {getPlant} from '../data/data-services';

function Product() {
    const { id } = useParams();
    const [plant, setPlant] = useState({});
    const [qtValue, setQtValue] = useState(1);
    const [modalShow, setModalShow] = useState(false);

    const handleQteChange = (e) => {
        //const qteChanged = (e.target.validity.valid) ? e.target.value : qtValue;
        setQtValue(e.target.value.replace(/\D/,''));
    }

    const handleSubmit = (e) => {
        setModalShow(true);
        e.preventDefault();
    }

    useEffect(() => {
        const fetchPlant = async () => {
            let plant = await getPlant(id);
            setPlant(plant);
        };
        fetchPlant();
    }, [id]);
  
    return (
        <div>
            <ModalSubmit show={modalShow} />
            <Row className="rowNav">
                <Col xs={12}>
                    <Button as={NavLink} exact to="/products" variant="outline-secondary">Go back</Button>
                </Col>
            </Row>
            <cartContext.Consumer>
                {({cartValues, dispatch}) => (
                    <Row>
                        <Col xs={12} md={6}>
                            <Image src={`/images/${plant.image}`} rounded fluid />
                        </Col>
                        <Col xs={12} md={6}>
                            <Card className="detailCard">
                                <Card.Body>
                                    <Card.Title>{plant.name}</Card.Title>
                                    <Card.Text>{plant.description}</Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem className="detailCard-stock">
                                        <span>Stocks left : {plant.stock}</span>
                                        <span>Already in cart : {
                                            console.log(cartValues.filter(c => c.id === plant.id))}
                                        </span>
                                    </ListGroupItem>
                                </ListGroup>
                                <Card.Body className="detailCardBuy">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="formQte" className="detailInput">
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend">Quantity</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control
                                                type="text"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                value={qtValue}
                                                onChange={handleQteChange}
                                                pattern="[0-9]*"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please use numbers
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Button variant="primary plantBtn" type="submit" >Add to cart</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </cartContext.Consumer>
            
        </div>
    )
  }

  function ModalSubmit(props) {
    const [show, setShow] = useState(props.show);
    const handleClose = () => setShow(false);
      return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
      )
  }
  
  export default Product;