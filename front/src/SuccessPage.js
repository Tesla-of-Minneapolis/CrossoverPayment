import React, { Component } from 'react';
import check from './Images/check.jpg';

export default class SuccessPage extends Component {
      render() {
        return (
          <div className="successContainer">
            <div className="success">
              <img src={check}></img>
              <h2>Thank you for your purchase!</h2>
              <h3>You will receive a confirmation email with shipping information.</h3>
            </div>
            <div className="newsletterInfo">
              <h2>Our Newsletter</h2>
              <h3> Sign up here to recieve our lastest announcements and news about upcoming models.</h3>
              <input className="newsletter" placeholder='Name'></input><br/>
              <input className="newsletter" placeholder='Email'></input><br/>
              <button className="quantButton">Sign Up Now</button>

            </div>
          </div>
        );
      }
    }
