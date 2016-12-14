import React, { Component } from 'react';

export default class CartPage extends Component {
  constructor(props){
    super(props);
    this.state={
      items: [
        {
        id: 0,
        img:'',
        model: 'Model 3',
        year: 2008,
        battery: '60 kWh'

      },
      {
        id: 1,
        img:'',
        model: 'Model S',
        year: 2012,
        battery: '60 kWh'
      },
      {
        id: 2,
        img:'',
        model: 'Powerwall',
        year: 2018,
        battery: '60 kWh'
      },],
    }
  }
      render() {
        return (
          <div><h2>Cart</h2>
          <ul>
            {this.props.items.map((item, index) => {
              return (
                <li key={item.id}>
                      <span>{item.model}</span>
                </li>
              )
            })}
          </ul>
          </div>
        );
      }
    }
