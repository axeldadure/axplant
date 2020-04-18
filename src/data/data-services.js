import axios from 'axios';
import save from './data-save.json';

const url = "http://localhost:4000"

export const getPlants = () => {
    return (
        axios.get(`${url}/plants`)
        .then(res => {
            return res.data;
        }).catch(function(error) {
            console.log(error);
        })
    );
}

export const getPlant = (id) => {
    return (
        axios.get(`${url}/plants/${id}`)
        .then(res => {
            return res.data;
        }).catch(function(error) {
            console.log(error);
        })
    );
}

export const delStock = (id, qt) => {

    axios.get(`${url}/plants/${id}`)
    .then(stock => {
        axios.patch(`${url}/plants/${id}`, {
        stock: stock.data.stock - qt
        })
    })
    .catch(function(error) {
        console.log(error);
    })
}


export const reset = () => {
    for (let i = 0; i < 9; i++) {
        axios.put(`${url}/plants/${i+1}`, save.plants[i])
        .then(res => {
            console.log(res);
        })
        .catch(function(error) {
            console.log(error);
        })
    }
}