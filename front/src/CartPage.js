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
      this.setState({
        inventory: quantItems
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
         this.getMyCart()
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
    quantChange(result, e){
      e.preventDefault();
      axios.post(api() + '/adjustQuantity?itemId=' + result.id + 'adjustQuantity=' + (result.quantity))
      .then((response) => {
        this.getMyCart();
        axios.get(api() + '/tax?zipCode=' + this.state.newZIPValue)
        .then((response) => {
        console.log(response.data.totalRate);
        let newTaxRate = response.data.totalRate/100;
        let taxAmount = Math.round10(newTaxRate * this.state.subtotal, -2);
        let newTotal = taxAmount + this.state.subtotal
        this.setState({
          isFormShown: !this.state.isFormShown,
          taxRate: newTaxRate,
          tax: taxAmount,
          total: newTotal
        })
        console.log(this.state.taxRate);
      })
      .catch((err) => {
        console.error(err);
      })
    }).catch((err) => {
      console.error(err);
    })
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
                  {/* <form>
                    <input placeholder="1"
                    // onChange={this.quantChange.bind(this)}
                    >

                    </input>
                  </form> */}
                  <div className="deleteDiv">
                    <button className="deleteButton" onClick={this.onDeleteClick.bind(this, item)}  key={item.id}>Remove</button>
                  </div>
                  </div>
                </li>
              )
            })}
          </ul>
            <Link className="continueShopping" to={"/cars"}> Continue Shopping</Link>
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
