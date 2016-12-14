import React, { Component } from 'react';
import api from './ApiCall.js';
import axios from 'axios';
import getCarImages from './carimages.js'


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
            <h5> Find the Right Fit </h5>
            <ul className="allCars">
              {this.state.inventory.map((car) => {
                return (
                <li className={car.model} key={car.id}>
                  <div className="carImage">
                      <img alt='Product' src={getCarImages(car.image.split('.')[0])}/>
                  </div>
                  <p className='model'>{'Model: ' + car.model}</p>
                <div className="productInfo">
                  <p className='price'>{'Engine Size: ' + car.engine}</p>
                  <p className='description'>{car.exteriorColor}</p>
                </div>
              </li>
            )
          })}
        </ul>
          </div>
        );
      }
    }
