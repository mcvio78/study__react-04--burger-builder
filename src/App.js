// import React, { Component } from 'react';
import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// const asyncAuthComponent = asyncComponent(() => {
//   return import('./containers/Auth/Auth')
// })
// const asyncCheckoutComponent = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout')
// })
// const asyncOrdersComponent = asyncComponent(() => {
//   return import('./containers/Orders/Orders')
// })
const Auth = lazy(() => {
  return import('./containers/Auth/Auth')
})
const Checkout = lazy(() => {
  return import('./containers/Checkout/Checkout')
})
const Orders = lazy(() => {
  return import('./containers/Orders/Orders')
})


// export class App extends Component {
//
//   // componentDidMount() {
//   //   console.log(
//   //   'process.env.REACT_APP_SECRET_VARIABLE: ',
//   //    process.env.REACT_APP_SECRET_VARIABLE
//   //   );
//   //   console.log('process.env: ', process.env);
//   // }
//
//   componentDidMount() {
//     this.props.onTryAutoSignUp();
//   }
//
//   render() {
//     let routes = (
//       <Switch>
//         <Route path="/auth" component={AsyncAuthComponent}/>
//         <Route path="/" exact component={BurgerBuilder}/>
//         <Redirect to="/"/>
//       </Switch>
//     );
//
//     if (this.props.isAuth) {
//       routes = (
//         <Switch>
//           <Route path="/checkout" component={AsyncCheckoutComponent}/>
//           <Route path="/orders" component={AsyncOrdersComponent}/>
//           <Route path="/logout" component={Logout}/>
//           <Route path="/auth" component={AsyncAuthComponent}/>
//           <Route path="/" exact component={BurgerBuilder}/>
//           <Redirect to="/"/>
//         </Switch>
//       );
//     }
//     return (
//       <div>
//         <Layout>
//           {routes}
//         </Layout>
//       </div>
//     );
//   }
// }

export const App = props => {
  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp])

  let routes = (
    <Switch>
      {/*<Route path="/auth" component={Auth}/>*/}
      <Route path="/auth" render={props => <Auth {...props}/>}/>
      <Route path="/" exact component={BurgerBuilder}/>
      <Redirect to="/"/>
    </Switch>
  );

  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path="/checkout" render={props => <Checkout {...props}/>}/>
        <Route path="/orders" render={props => <Orders {...props}/>}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/auth" render={props => <Auth {...props}/>}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
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
