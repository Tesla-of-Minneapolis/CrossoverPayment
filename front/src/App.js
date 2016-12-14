import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router';
import axios from 'axios';
import api from './ApiCall.js';
import navlogo from './Images/navlogo.jpg';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiCall: api(),
    }
  }

  getInfo(e){
    axios.get(this.state.apiCall)
    .then((response) => {
      })
    .catch((error) => {
      alert('Sorry! Try again later')
    });
  }

  componentDidMount() {
    this.getInfo()
  }

  render() {
    return (
      <div className="App">
        <div className="containingDiv">
        <div className="navDiv">
          <ul className="nav">
            <img className="navlogo" role="presentation" src={navlogo} />
            <li className="navItem"><Link to={'/home'}>Home </Link></li>
            <li className="navItem"><Link to={'/cars'}>Store</Link></li>
            <li className="navItem"><Link to={'/cart'}>My Cart</Link></li>
            <li className="navItem"><Link to={'/contact'}>Contact</Link></li>
          </ul>
        </div>
        <div>
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
