import React, { Component } from 'react';
import {browserHistory, Link} from 'react-router';
import getCarImages from './carimages.js';

import api from './ApiCall.js';
import axios from 'axios';


export default class CartPage extends Component {
  constructor(props){
    super(props);
    this.state={
        inventory: [],
        myCart: api()+'/api/cart',
        productsCall: api()+'/api/products',
        newZIPValue: 0,
        showToggleOnZip: false,
        taxApi: api()+'/api/tax?zipCode=',
        taxInfo: [],
        taxRate: 0,
        subtotal: 0,
        taxAmount: 0,
        grandTotal: 0,
        id:'',
    }
  }

  componentDidMount () {
    this.getMyCart()
  }

  getMyCart() {
    axios.get(this.state.myCart).then((responseCart) => {
      axios.get(this.state.productsCall)
    .then((response) => {
      var cart = response.data.filter((v) => {
        return responseCart.data[''+v.id+''] > 0
      });
      var quantItems = cart.map((v) => {
        var newItem = v;
        newItem.quantity = responseCart.data[''+v.id+'']
        return newItem;
      });
      var itemsSubtotal = quantItems.map((item, index) => {
              var itemSubtotal = item.price * item.quantity
              return itemSubtotal;
            });
            var reducedSubtotal = itemsSubtotal.reduce(function(a, b) {
              return a + b;
            }, 0);
      this.setState({
        inventory: quantItems,
        subtotal: reducedSubtotal
      })
    })
  })
    .catch((error) => {
      alert(error);
      console.log(error);
    });
  }

   onDeleteClick(car, e) {
     var confirmed = confirm("Do you want to remove this from your cart?")
     if (confirmed === true){
       axios.post(api() + '/api/removeProduct?id=' + car.id).then((deleted) => {
         browserHistory.push('/cart');
       }).then((response) => {
         this.getMyCart();
         if (this.state.showToggleOnZip == true) {
           this.getTaxInfo();
         }
       })
        .catch((error) => {
          console.log(error);
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

  onZIPSubmit(e) {
    e.preventDefault()

    if (this.state.newZIPValue.length === 5) {
      this.getTaxInfo();
      this.setState({
        showToggleOnZip: true
      })
    } else {
      alert("Please enter a 5-digit ZIP code")
    }
  }

  getTaxInfo() {
    axios.get(this.state.taxApi+this.state.newZIPValue)
    .then((response) => {
      var newTaxInfo = response.data.rates.slice(0);
      console.log(newTaxInfo)
      this.setState({
        taxInfo: newTaxInfo
      })
      this.getTaxRate();
      this.getTaxAmount();
      this.getTotal();
    })
    .catch((error) => {
      alert("Please check to make sure your ZIP code is valid, and that you are connected to the Internet");
    });
  }

  getTaxRate() {

    let newTaxRate = this.state.taxInfo.map((tax) => {
      return tax.rate
    })
    .reduce(function(a, b){
      return a + b
    }, 0)
    console.log(newTaxRate)
    this.setState({
      taxRate: newTaxRate
    })
  }

     getTaxAmount() {
       console.log(this.state.taxRate)
       console.log(this.state.subtotal)
       let modTaxRate = this.state.taxRate * .01
       let baseTax = modTaxRate * this.state.subtotal
       let taxAmount = Math.round(baseTax)
       console.log(taxAmount)
       this.setState({
        taxAmount: taxAmount
        })
      }

      getTotal() {
        let total = this.state.subtotal + this.state.taxAmount
        this.setState({
          grandTotal: total
        })
      }

      quantChange(result, e) {
        e.preventDefault();
        console.log(e.target.value)
        axios.post(api() + '/api/adjustQuantity?id=' + result.id + '&adjustQuantity=' + e.target.value)
      }

      render() {
        let toggleOnZIP =
        <div className="toggleOnZIP">
            <div> Tax: {'$' + this.state.taxAmount}  <br /><br/>
                  <div className="grandTotal">Total: {'$' + this.state.grandTotal}</div>
            </div>
            <div className="buyDiv">
              <Link className="carlistlink" to={"/success"}> Buy Now! </Link>
            </div>
        </div>


        return (
          <div className="carsContainer"><h2>My Cart</h2>
          <ul>
              {this.state.inventory.map((item, index) => {

              return (
                <li key={item.id}>
                <div className="liContainerDiv">
                  <div className="singleCarCart">

                    <div className="leftDiv">
                      <img role="presentation" className="listImage" src={getCarImages(item.image.split('.')[0])} />
                      <br />
                      <span>{item.model}</span>
                    </div>

                    <div className="rightDiv">
                      <div>Price per car (USD): {item.price}</div>
                      <div className="formDiv">
                      <form>
                       <input
                        className='quantInput'
                        placeholder={item.quantity}
                        onChange={this.quantChange.bind(this, item)}
                       >

                       </input>
                       <br />
                       <button className="quantButton"> Change Quantity</button>
                     </form>
                     </div>
                    </div>
                    <div className="deleteDiv">
                      <button className="deleteButton" onClick={this.onDeleteClick.bind(this, item)}  key={item.id}>Remove</button>
                    </div>
                  </div>
                </div>
                </li>
              )
            })}
          </ul>
            <Link className="continueShopping" to={"/cars"}> Continue Shopping</Link>
          <div>
          <p>Enter zip code to receive your total cost.</p>
          <form onSubmit={this.onZIPSubmit.bind(this)}>
            <input className="zipCode" type="text" placeholder="ZIP code" value={this.state.newZIPValue} onChange={this.onNewValue.bind(this)} />
            <button className="quantButton" onClick={this.onZIPSubmit.bind(this)}>Submit ZIP</button>
          </form>
          </div>
          <div className="subtotalDiv">Subtotal: {'$' + this.state.subtotal} </div>
          {!this.state.showToggleOnZip ? null : toggleOnZIP}
          </div>
        );
      }
    }
