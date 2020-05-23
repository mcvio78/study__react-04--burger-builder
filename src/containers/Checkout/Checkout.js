import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // state = {
  //   ingredients: null,
  //   totalPrice: 0
  // };

  // componentWillMount() { /* eslint-disable-line */
  //   const query = new URLSearchParams(this.props.location.search);
  //   let ingredientsFromURL = {};
  //   let priceFromURL = 0;
  //
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       priceFromURL = param[1];
  //     } else {
  //       ingredientsFromURL[param[0]] = +param[1];
  //     }
  //
  //     // for (const [key, value] of query.entries()) {
  //     //   ingredientsFromURL[key] = +value;
  //     //   console.log('ingredientsFromURL: ', ingredientsFromURL);
  //     // }
  //   }
  //
  //   this.setState({
  //     ingredients: ingredientsFromURL,
  //     totalPrice: priceFromURL
  //   });
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        {this.props.ings ?
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCandelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/> : null}
        {/*<Route path={this.props.match.path +
         '/contact-data'} component={ContactData}/>*/}
        <Route
          path={this.props.match.path + '/contact-data'}
          // render={props => (
          //   <ContactData
          //     ingredients={this.props.ings}
          //     price={this.props.tot}
          //     {...props}/>
          // )}
          component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
