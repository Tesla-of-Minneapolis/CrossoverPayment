import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';
import App from './App';
import './index.css';

ReactDOM.render(
/*  <Router history={browserHistory}>
    <Route path="/" component={App} >,
      <IndexRoute component={LandingPage} />
      <Route path="/home" component={HomePage}/>
      <Route path="/cars" component={CarsPage}>
        <Route path="/car" component={SingleCar}/>
      </Route>
      <Route path="/cart" component={CartPage}/>
      <Route path="/confirm" component={ConfirmPage}/>
      <Route path="/success" component={SuccessPage}/>
      <Route path="/battery" component={BatteryPage}/>

      <Route path="*" component={NoMatch} />
    </Route>

  </Router>, */
  
  <App />
  document.getElementById('root')
);
