import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  NavLink,
  useRouteMatch
} from "react-router-dom";
import {Container, Row, Col, Card, Button, ListGroup} from 'react-bootstrap';
import {getPlants} from '../data/data-services';

import Product from './Product';

function ProductsContainer() { 
    let match = useRouteMatch();
    return (
      <Container>
        <Switch>
          <Route path={`${match.path}/:id([1-9])`} children={<Product />} />
          <Route path={match.path} children={<ProductsListing />} />
        </Switch>
      </Container>
    )
}

export function ProductsListing() {
  const breakPoint = 0;
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    let plants = await getPlants();
    setPlants(plants);
  }

  useEffect(() => {
    fetchPlants();
  }, [breakPoint]);

  let match = useRouteMatch();
  return (
    <Row>
      {plants.map(plant => (
        <Col xs={6} md={4} key={plant.id}>
          <Card className="plantCard">
            <Card.Img variant="top" src={`/images/${plant.image}`} />
            <Card.Body>
              <Card.Title>{plant.name}</Card.Title>
              <Card.Text>
                {plant.description}
              </Card.Text>
            </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Stock left : {plant.stock}</ListGroup.Item>
              </ListGroup>
            <Card.Body>
              <span className="plantPrice">Price : {plant.price}$</span>
              <Button as={NavLink} variant="primary plantBtn" exact to={`${match.url}/${plant.id}`}>Details</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProductsContainer;