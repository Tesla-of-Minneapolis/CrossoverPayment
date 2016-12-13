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
      console.log(response)
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="navDiv">
          <ul className="nav">
            <li className="navItem"><Link to={'/home'}>Home</Link></li>
            <li className="navItem"><Link to={'/battery'}>Chargers</Link></li>
            <li className="navItem"><Link to={'/cars'}>Cars</Link></li>
          </ul>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
