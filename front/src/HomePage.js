import React, { Component } from 'react';
import dealership from './Images/homepagebuilding.jpg';
import {Link} from 'react-router';
import car1 from './Images/modelSbas.jpg';
import car2 from './Images/modelXlux.jpg';
import car3 from './Images/model3exo.jpg';

export default class HomePage extends Component {
      render() {
        return (
          <div className="contentContainer">
            <img className="dealership" src={dealership} />
            <div>
            <h2 className="red underline">Who We Are</h2>
            </div>
            <div className="hasText">
            <p>Tesla Minneapolis was dreamed up in 2015 by a group of engineers in Minneapolis who wanted to prove that electric cars could be better than gasoline-powered cars. With instant torque, incredible power, and zero emissions, Tesla’s products would be cars without compromise. Each new generation would be increasingly affordable, helping the company work towards its mission: to accelerate the world’s transition to sustainable transport.</p>

            <p>Tesla’s engineers first designed a powertrain for a sports car built around an AC induction motor, patented in 1888 by Nikola Tesla, the inventor who inspired the company’s name. The resulting Tesla Roadster was launched in 2008. Accelerating from 0 to 60 mph in 3.7 seconds and achieving a range of 245 miles per charge of its lithium ion battery, the Roadster set a new standard for electric mobility. Tesla would sell more than 2,400 Roadsters, now on the road in more than 30 countries. </p>
            </div>
            <div>
            <img className="homeCar" src={car1} />
            <img className="homeCar" src={car2} />
            <img className="mobileCar" src={car3} />
            </div>
            <div className="hasText">
            <p><h2 className="red adjustMargin"> Beauty. <br/> Power. <br/> Sustainability.</h2></p>
            </div>
            <Link className="carlistlink" to={"/cars"}> Cars </Link>
          </div>
        );
      }
    }
