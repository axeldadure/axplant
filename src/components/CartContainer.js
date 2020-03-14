import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {cartContext} from "./CartContext";
import {getPlant, delStock} from '../data/data-services';

function CartContainer(props) {
    const [cartPlants, setCartPlants] = useState([]);

    const fetchPlants = async (id, qt) => {
        let plant = await getPlant(id);
        setCartPlants(oldPlants => [...oldPlants, {plant, qt}]);
    };
    
    useEffect(() => {
        setCartPlants([]);
        props.cartPlantIds.map(each => {
            fetchPlants(each.id, each.qt);
        });
    }, [props.cartPlantIds]);

    const checkout = async (id, qt) => {
        await delStock(id, qt);
        setCartPlants(cartPlants);
    };

    return (
        <cartContext.Consumer>
            {({cartPlantIds, dispatch}) => (
                <Container>
                    <Row>
                        <Col>
                        {cartPlants.length > 0 ? (
                            <h2>You have {props.cartCount} items in your cart</h2>
                        ):(
                            <h2>Your cart is empty :(</h2>
                        )}
                        </Col>
                    </Row>
                    <Row className="cartPlantRows">
                        {cartPlants.map(cartPlant => (
                            <PlantRow plant={cartPlant.plant} 
                            plantQt={cartPlant.qt}
                            key={cartPlant.plant.id}
                            dispatch={dispatch}/>
                        ))}
                    </Row>
                    <Row className="cartPlantCheckout">
                        <Col>
                            <Button variant="light" onClick={() => dispatch({type:'empty'})}>Empty cart</Button>
                            <Button variant="primary plantBtn" onClick={() => checkout(1, 4)}>Buy !</Button>
                        </Col>
                    </Row>
                </Container>
            )}
        </cartContext.Consumer>
    );
}

function PlantRow({plant, plantQt, dispatch}) {
    return (
        <Col xs={12}>
            <div className="cartPlantRow">
                <div className="cartPlantRowImage">
                    <img src={`/images/${plant.image}`} />
                </div>
                <div className="cartPlantRowIn">
                    <div className="cartPlantRowLeft">
                        <h5>{plant.name}</h5>
                        <span className="cartPlantRowStock">(Stock left : <span>{plant.stock}</span>)</span>
                    </div>
                    <div className="cartPlantRowRight">
                        <div 
                        className={"cartPlantRowRightEl cartPlantRowOpe" + (plantQt === 1 ? " disabled":"")} 
                        onClick={() => dispatch({id:plant.id, type:'reduce', qt:1})}>-</div>

                        <div className="cartPlantRowRightEl">
                            <span className="cartPlantRowQt">{plantQt}</span>
                        </div>

                        <div className={"cartPlantRowRightEl cartPlantRowOpe" + (plantQt === plant.stock ? " disabled":"")} 
                        onClick={() => 
                        dispatch({id:plant.id, type:'add', qt:1, qtLeft:plant.stock})}>+</div>

                        <div 
                        className="cartPlantRowRightEl cartPlantRowDel" 
                        onClick={() => dispatch({id:plant.id, type:'remove'})}><span>+</span></div>
                    </div>
                    </div>
            </div>
        </Col>
    )
}

export default CartContainer;