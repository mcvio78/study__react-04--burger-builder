import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
/* eslint-disable */
const AsyncAuthComponent = asyncComponent(() => import('./containers/Auth/Auth') );
const AsyncCheckoutComponent = asyncComponent(() => import('./containers/Checkout/Checkout') );
const AsyncOrdersComponent = asyncComponent(() => import('./containers/Orders/Orders') );
/* eslint-enable */
class App extends Component {

  // componentDidMount() {
  //   console.log(
  //   'process.env.REACT_APP_SECRET_VARIABLE: ',
  //    process.env.REACT_APP_SECRET_VARIABLE
  //   );
  //   console.log('process.env: ', process.env);
  // }

  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={AsyncAuthComponent}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/checkout" component={AsyncCheckoutComponent}/>
          <Route path="/orders" component={AsyncOrdersComponent}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={AsyncAuthComponent}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
