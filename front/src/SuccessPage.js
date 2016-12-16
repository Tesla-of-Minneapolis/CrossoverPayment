import React, { Component } from 'react';
import check from './Images/check.jpg';

export default class SuccessPage extends Component {
      render() {
        return (
          <div className="successContainer">
            <div className="success">
              <img src={check}></img>
              <h2>Thank you for for purchase!</h2>
              <h3>You will receive and email in regards to when your new purchase will be shipped.</h3>
            </div>
            <div className="newsletter">
              <h2>Our Newsletter</h2>
              <h3> Sign up here to recieve our lastest announcements and news about upcoming models.</h3>
              <input placeholder='Name'></input><br/>
              <input placeholder='Email'></input><br/>
              <button>Sign Up Now</button>

            </div>
          </div>
        );
      }
    }
