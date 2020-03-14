import axios from 'axios';

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
    axios.patch(`${url}/plants/${id}`, {
        stock: qt
    })
    .then(res => {
        console.log(res);
    })
    .catch(function(error) {
        console.log(error);
    })
}