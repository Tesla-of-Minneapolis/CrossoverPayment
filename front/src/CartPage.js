import React, { Component } from 'react';
import {Link} from 'react-router';
import getCarImages from './carimages.js';
import api from './ApiCall.js';
import axios from 'axios';

export default class CartPage extends Component {
  constructor(props){
    super(props);
    this.state={
        inventory: [],
        engine:'',
        exteriorColor:'',
        id: 0,
        image:'',
        interiorColor: '',
        model: '',
        price: 0,
        year: 0,
        myCart: api()+'/api/products',
        newZIPValue: 0,
        showToggleOnZip: false
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

   onDeleteClick(id, e) {
      var confirmed = confirm("Do you want to remove this from your cart?")
      if (confirmed === true){
        console.log(api()+'api/cart/'+id)
        axios.delete(api()+'api/cart/'+id)
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

    onNewValue(e) {
     this.setState({
       newZIPValue: e.target.value
     });
    }

    onTaskSubmit(e) {
    e.preventDefault()
    alert(this.state.newZIPValue)
  }

    getSubtotal() {
      let subtotal = this.state.inventory.map((item) => {
        return item.price
      })
      .reduce(function(a, b){
        return a + b
      }, 0)
      return subtotal
    }

    onToggle(e) {
      e.preventDefault();
      if (this.state.newZIPValue.length === 5) {
      this.setState({
        showToggleOnZip: true
      })
    } else {
      alert("Please enter a 5-digit ZIP code")
    }
    }

      render() {
        let toggleOnZIP =
        <div className="toggleOnZIP">
            <div> Tax: <br />
                  Total:
            </div>
            <div>
              <Link to={"/success"}><h2>BUY NOW</h2></Link>
            </div>
        </div>

        return (
          <div className="carsContainer"><h2>Cart</h2>
          <ul>
              {this.state.inventory.map((item, index) => {

              return (
                <li key={item.id}>
                <div className="liContainerDiv">

                  <div className="leftDiv">
                    <span>{item.model}</span>
                    <br />
                    <img role="presentation" className="listImage" src={getCarImages(item.image.split('.')[0])} />
                  </div>

                  <div className="rightDiv">
                    <div>Price (USD): {item.price}</div>
                  </div>

                  <div className="deleteDiv">
                    <button className="deleteButton" onClick={this.onDeleteClick.bind(this, item.id)}  key={item.id}>Remove</button>
                  </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div>
          <form onSubmit={this.onTaskSubmit.bind(this)}>
          <input className="zipCode" type="text" placeholder="ZIP code" value={this.state.newZIPValue} onChange={this.onNewValue.bind(this)} />
          <button onClick={this.onToggle.bind(this)}>Submit ZIP</button>
          </form>
          </div>
          <div className="subtotalDiv">Subtotal: {this.getSubtotal()} </div>
          {!this.state.showToggleOnZip ? null : toggleOnZIP}
          </div>
        );
      }
    }
