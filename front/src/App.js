import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import api from './ApiCall.js'

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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
