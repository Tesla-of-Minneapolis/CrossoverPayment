import React, { Component } from 'react';
import api from './ApiCall.js';
import axios from 'axios';


export default class CarsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      engine: '',
      exteriorColor: '',
      id: '',
      image: '',
      interiorColor: '',
      model: '',
      price: '',
      year: '',
      apiCall: api()
    };
  }

  componentDidMount() {
    this.getInitialData()
  }

  getInitialData() {
    let inventory;
    axios.get('/api/products').then((response) => {
      inventory = response.data
      this.setState({inventory})
      console.log(inventory)
    })
  }



      render() {
        return (
          <div>
            {/* <ul>
              {this.state.inventory.map((car) => {
                return (
                  <li className='carEngine' key={car.id}>{car.engine}</li>
                )
              })}
            </ul> */}
          </div>
        );
      }
    }
