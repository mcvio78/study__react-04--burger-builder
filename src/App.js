import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  // state = {
  //   show: true
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 3000);
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
    return (
      <div>
        <Layout>
          <Switch>
            {/*<Checkout/>*/}
            <Route path="/checkout" component={Checkout}/>
            {/*<BurgerBuilder/>*/}
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
            {/*{this.state.show ? <BurgerBuilder/> : null}*/}
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.checkAuthState())
  };
};

export default connect(null, mapDispatchToProps)(App);
