import React, { Component } from 'react';
import api from './ApiCall.js';
import axios from 'axios';
import getCarImages from './carimages.js'
import {browserHistory} from 'react-router';



export default class CarsPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      inventory: [],
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

addToCart(car, e) {
      axios.post(api() + '/api/addProduct?id=' + car.id).then((added) => {
      //   // tell the router to redirect to the cart page
        browserHistory.push('/cart');
      })
    }

      render() {
        return (
          <div className="carsContainer">
            <ul className="allCars">
              {this.state.inventory.map((car) => {
                return (
                <li className={car.model} key={car.id}>
                  <div className="carImage">
                      <img alt='Product' src={getCarImages(car.image.split('.')[0])}/>
                  </div>
                  <h4 className='model'>{car.model}</h4>
                <div className="productInfo">
                  <p className='price'>{'Engine Size: ' + car.engine}</p>
                  <p className='year'>{'Year: ' + car.year}</p>
                  <p className='carColor'>{car.exteriorColor}</p>
                  <p className='carColor'>{car.interiorColor}</p>
                  <p className='year'>{'Est. Price: ' + '$' + car.price}</p>
                </div>
                <button onClick={this.addToCart.bind(this, car)}> Add to Cart </button>
              </li>
            )
          })}
        </ul>
      </div>
        );
      }
    }
