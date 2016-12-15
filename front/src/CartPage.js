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
        myCart: api()+'/api/cart',
        newZIPValue: 0,
        showToggleOnZip: false,
        taxApi: api()+'/api/tax?zipCode=',
        taxInfo: []
    }
  }

  componentDidMount () {
    axios.get(this.state.myCart)
    .then((response) => {
      var cart = (Object.assign({}, response.data))
      console.log(response.data)
      this.setState({
        inventory: []
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

  getTaxInfo() {
    axios.get(this.state.taxApi+this.state.newZIPValue)
    .then((response) => {
      var newTaxInfo = response.data.slice(0);
      console.log(newTaxInfo)
      this.setState({
        taxInfo: newTaxInfo
      })
    })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  getTaxRate() {
    let taxRate = this.state.taxInfo.map((tax) => {
      return tax.rate
    })
    .reduce(function(a, b){
      return a + b
    }, 0)
    return taxRate
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

    // getTaxAmount() {
    //   let taxAmount = taxRate * subtotal * .01
    //   return TaxAmount
    // }
    //
    // getTotal() {
    //   let total = subtotal + taxAmount
    //   return total
    // }

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
            <div> Tax:  <br />
                  Total:
            </div>
            <div className="buyDiv">
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
