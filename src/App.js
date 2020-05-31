import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  state = {
    show: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: false });
    }, 3000);
  }

  // componentDidMount() {
  //   console.log('process.env.REACT_APP_SECRET_VARIABLE: '
  //   , process.env.REACT_APP_SECRET_VARIABLE);
  //   console.log('process.env: ', process.env);
  // }

  render() {
    return (
      <div>
        <Layout>
          {/*<Checkout/>*/}
          <Route path="/checkout" component={Checkout}/>
          {/*<BurgerBuilder/>*/}
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          {/*{this.state.show ? <BurgerBuilder/> : null}*/}

        </Layout>
      </div>
    );
  }
}

export default App;
