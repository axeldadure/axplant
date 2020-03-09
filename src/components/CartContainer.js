import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {cartContext} from "./CartContext";
import {getPlant} from '../data/data-services';

function CartContainer(props) {
    const [cartPlants, setCartPlants] = useState([]);

    const fetchPlants = async (id, qt) => {
        let plant = await getPlant(id);
        setCartPlants(oldPlants => [...oldPlants, {plant: plant, qt: qt}]);
    };
    
    useEffect(() => {
        setCartPlants([]);
        props.cartPlantIds.map(each => {
            fetchPlants(each.id, each.qt);
        });
    }, [props.cartPlantIds]);

    return (
        <cartContext.Consumer>
            {({cartPlantIds, dispatch}) => (
                <Container>
                    <Row>
                        <Col><h2>You have {cartPlantIds.length} items in your cart</h2></Col>
                    </Row>
                    <Row>
                        {cartPlants.map(cartPlant => (
                            <PlantRow plant={cartPlant.plant} 
                            plantQt={cartPlant.qt}
                            key={cartPlant.plant.id}
                            dispatch={dispatch}/>
                        ))}
                    </Row>
                </Container>
            )}
        </cartContext.Consumer>
    );
}

function PlantRow({plant, plantQt, dispatch}) {
    return (
        <Col xs={12}>
            <div className="plantRow">
                <div className="plantRowLeft">
                    <h5>{plant.name}</h5>
                </div>
                <div className="plantRowRight">
                    <div className="plantRowRightEl plantRowOpe" onClick={() => dispatch({id:plant.id, type:'remove', qt:1})}>-</div>
                    <div className="plantRowRightEl">Qty : {plantQt}</div>
                    <div className="plantRowRightEl plantRowOpe" onClick={() => dispatch({id:plant.id, type:'add', qt:1})}>+</div>
                </div>
            </div>
        </Col>
    )
}

export default CartContainer;