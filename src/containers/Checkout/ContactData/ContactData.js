import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: ''
			},
			delivery: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: ''
			},
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		// alert('You continue!')
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		};
		axios.post('/orders.json', order)
		.then(() => {
			// console.log(response)
			this.props.history.push('/');
			this.setState({ loading: false })
		})
		.catch(() => {
			// console.log(error)
			this.setState({ loading: false })
		})
	};

	render() {
		let form = (
			<form>
				{/*<Input elementType={} elementConfig={} value={}/>*/}

				<Input inputtype="input" type="text" name="name" placeholder="Your Name"/>
				<Input inputtype="input" type="email" name="email" placeholder="Your Mail"/>
				<Input inputtype="input" type="text" name="street" placeholder="Your Street"/>
				<Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code"/>
				<Button btnType="Success" clicked={this.orderHandler}>Order</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner/>
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
