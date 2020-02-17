import axios from 'axios';

export const getPlant = () => {
    return (
        axios.get(`https://jsonplaceholder.typicode.com/users`)
        .then(res => {
            return res.data;
        }).catch(function(error) {
            console.log(error);
        })
    );
}