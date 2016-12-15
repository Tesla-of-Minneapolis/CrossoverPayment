import React, { Component } from 'react';
import contactPic from './Images/contactimage.jpg'

export default class ContactPage extends Component {
      render() {
        return (
          <div>
            <div className="contactContainer">
              <div className="contactInfo">
              <h2>Contact</h2>
              <h3>Sales</h3>
              <p>Toll free: (888) 51-TESLA or (888) 518-3752</p>
              <p>Local: (650) 681-5100</p>
              <p>Fax: (650) 681-5101</p>
              <a href="mailto:NASales@tesla.com">Email North America Sales</a>
            </div>
            <div className="office">
              <h3>Tesla Headquarters</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <div className="office">
              <h3>Tesla Factory</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <div className="office">
              <h3>Tesla Gigafactory</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <div className="office">
              <h3>Tesla Amsterdam Zuid Oost</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <div className="office">
              <h3>Tesla Tilburg Factory and Delivery Center</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <div className="office">
              <h3>Tesla Australia and Asia</h3>
              <p>3500 Deer Creek Road</p>
              <p>Palo Alto, CA 94304</p>
            </div>
            <img className="contactImage" role="presentation" src={contactPic} />
          </div>
        </div>
        );
      }
    }
