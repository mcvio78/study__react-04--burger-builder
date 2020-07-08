// import React, { Component } from 'react';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

// class Checkout extends Component {
//
//   checkoutCancelledHandler = () => {
//     this.props.history.goBack();
//   };
//
//   checkoutContinuedHandler = () => {
//     this.props.history.replace('/checkout/contact-data');
//   };
//
//   render() {
//     let summary = <Redirect to="/"/>;
//     if (this.props.ings) {
//       const purchasedRedirect = this.props.purchased
//         ? <Redirect to="/"/>
//         : null;
//
//       summary = (
//         <div>
//           {purchasedRedirect}
//           <CheckoutSummary
//             ingredients={this.props.ings}
//             checkoutCandelled={this.checkoutCancelledHandler}
//             checkoutContinued={this.checkoutContinuedHandler}/>
//           <Route
//             path={this.props.match.path + '/contact-data'}
//             component={ContactData}/>
//         </div>
//       );
//     }
//     return summary;
//   }
// }

const Checkout = props => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

  let summary = <Redirect to="/"/>;
  if (props.ings) {
    const purchasedRedirect = props.purchased
      ? <Redirect to="/"/>
      : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCandelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}/>
        <Route
          path={props.match.path + '/contact-data'}
          component={ContactData}/>
      </div>
    );
  }
  return summary;
}

const mapStateToProps = state => {
  return {
    ings: state.brgBld.ingredients,
    purchased: state.ord.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
