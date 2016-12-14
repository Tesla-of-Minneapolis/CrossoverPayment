import React, { Component } from 'react';
import api from './ApiCall.js';
import axios from 'axios';


export default class CarsPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      inventory: [],
      apiCall: api()
      // engine:'',
      // exteriorColor:'',
      // id: 0,
      // image:'',
      // interiorColor: '',
      // model: '',
      // price: 0,
      // year: 0,
  }
}

componentDidMount() {
  this.getInitialData()
}

getInitialData() {
  axios.get(api() + '/api/products')
  .then((response) => {
    let newInventory = response.data;
    console.log(newInventory);
    this.setState({
      inventory: newInventory,
    })
  })
  .catch(function (error) {
        console.log(error);
      });
}
      render() {

        return (
          <div className="carsContainer">
            <h5> Find the right Fit </h5>
            <ul className="allCars">
              {this.state.inventory.map((car) => {
                return (
                <li className={car.model} key={car.id}>
                  <div className="productImage">
                      <img alt='Product' src={car.image}/>
                </div>
                <div className="productInfo">
                  <p className='name'>{car.name}</p>
                  <p className='model'>{'Model: ' + car.model}</p>
                  <p className='price'>{'Price: ' + car.price}</p>
                  <p className='description'>{car.description}</p>
                  <div className='itemDetails'>
                </div>
                </div>
              </li>
            )
          })}
        </ul>
          </div>
        );
      }
    }
