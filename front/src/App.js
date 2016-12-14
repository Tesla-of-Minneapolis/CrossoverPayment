import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from 'react-router';
import axios from 'axios';
import api from './ApiCall.js';


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
            <li className="navItem"><Link to={'/home'}>Home</Link></li>
            <li className="navItem"><Link to={'/cars'}>Cars</Link></li>
            <li className="navItem"><Link to={'/battery'}>Energy</Link></li>
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
