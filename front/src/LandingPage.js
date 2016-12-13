import React, { Component } from 'react';
import logo from './Images/teslaname.jpg';
import logo2 from './Images/teslalogo.jpg';
import {Link} from 'react-router';


export default class LandingPage extends Component {
      render() {
        return (
          <div className="container">
            <div className="landing">
              <img className="teslaname" src={logo} />
              <img className="teslalogo" src={logo2} />
              <h1> Minneapolis </h1>
            </div>
              <Link className="homelink" to={"/home"}> The Future is here </Link>
          </div>
        );
      }
    }
