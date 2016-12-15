import React, { Component } from 'react';
import logo from './Images/teslaname.jpg';
import logo2 from './Images/teslalogo.png';
import {Link} from 'react-router';
import './index.css';


export default class LandingPage extends Component {
      render() {
        return (
          <div className="container">
            <div className="landing">
              {/* <img className="teslaname" role="presentation" src={logo} /> */}
              <h1> Tesla </h1>
              <img className="teslalogo" role="presentation" src={logo2} />
              <h1> Minneapolis </h1>
            </div>
            <div className="homelinkcontainer">
              <Link className="homelink" to={"/home"}> The Future is Here </Link>
            </div>
          </div>
        );
      }
    }
