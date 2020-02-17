import React, { Component } from 'react';
import axios from 'axios';
import {getPlant} from '../data/data-services';

class ProductsContainer extends Component {
    state = {
        persons: []
      }
    
      async componentDidMount() {
        let persons = await getPlant()
        this.setState({ persons });
      }
    
      render() {
        return (
          <ul>
            { this.state.persons.map(person => <li>{person.name}</li>)}
          </ul>
        )
      }
}

export default ProductsContainer;