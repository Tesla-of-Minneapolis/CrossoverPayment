import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';

class NoMatch extends Component {
  render() {
    return (
        <h1>Sorry, we are unable to find the page as you requested it. You can return to our <Link to={"/home"}>home page</Link> here.</h1>
    );
  }
}

export default NoMatch;
