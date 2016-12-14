import React, { Component } from 'react';
import api from './ApiCall.js';
import axios from 'axios';

export default class CartPage extends Component {
  constructor(props){
    super(props);
    this.state={
        inventory: this.props.inventory,
        engine:'',
        exteriorColor:'',
        id: 0,
        image:'',
        interiorColor: '',
        model: '',
        price: 0,
        year: 0,
        myCart: api()+'/api/products'
    }
  }

  componentDidMount () {
    axios.get(this.state.myCart)
    .then((response) => {
      var newInventory = response.data.slice(0);
      console.log(newInventory)
      this.setState({
        inventory: newInventory
      })
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  getState (){
    console.log(this.state.inventory)}

  onDeleteClick(id, e) {
      var confirmed = confirm("Do you want to remove this from your cart?")
      if (confirmed === true){
        console.log(api()+'api/products/'+id)
        axios.delete(api()+'api/products/'+id)
        .then((response) => {
          axios.get(this.state.myCart).then((response) => {
            let newInventory = response.data.slice(0);
            this.setState({
              inventory: newInventory
            })
            console.log("You removed the item")
          })
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        })
      } else {
        console.log("Whew!")
      }

    }

      render() {
        return (
          <div className="contentContainer"><h2>Cart</h2>
          <ul>
              {/*{this.state.inventory.map((item, index) => {
              return (
                <li key={item.id}>
                      <span>{item.model}</span>
                      <button className="deleteButton" onClick={this.props.onDeleteClick.bind(this, item.id)} key={item.id}>Remove</button>
                </li>
              )
            })}*/}
          </ul>
          </div>
        );
      }
    }
