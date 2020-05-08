import React, { Component } from 'react'
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state = {
		ingredients: { // temporary state, it'll be a prop
			salad: 1,
			meat: 1,
			bacon: 1,
			cheese: 1
		}
		// ingredients: null
	};

	componentDidMount() {

		const query = new URLSearchParams(this.props.location.search);
		let ingredientsFromURL = {};

		for (let param of query.entries()) {
			ingredientsFromURL[param[0]] = +param[1];
		}

		// for (const[key, value] of query.entries()) {
		// 	ingredientsFromURL[key] = +value;
		// 	console.log('ingredientsFromURL: ', ingredientsFromURL);
		// }

		this.setState({ ingredients: ingredientsFromURL })
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data')
	};

	render() {
		return (
			<div>
				{this.state.ingredients ?
					<CheckoutSummary
						ingredients={this.state.ingredients}
						checkoutCandelled={this.checkoutCancelledHandler}
						checkoutContinued={this.checkoutContinuedHandler}/> : null}
						<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
			</div>
		)
	}
}

export default Checkout;
