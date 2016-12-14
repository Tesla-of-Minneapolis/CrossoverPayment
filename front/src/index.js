import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './App';
import './index.css';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import CarsPage from './CarsPage';
import SingleCar from './SingleCar';
import CartPage from './CartPage';
import SuccessPage from './SuccessPage';
import NoMatch from './NoMatch';
import ContactPage from './ContactPage';

let inventory = [];

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={LandingPage}/>
    <Route path="/" component={App} >,
      <Route path="/home" component={HomePage}/>
      <Route path="/cars" component={CarsPage}/>
      <Route path="/car" component={SingleCar}/>
      <Route path="/cart" component={CartPage}/>
      <Route path="/success" component={SuccessPage}/>
      <Route path="/contact" component={ContactPage}/>

      <Route path="*" component={NoMatch} />
    </Route>

  </Router>,
  document.getElementById('root')
);
