import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });

		// alert('You continue!')
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Mauro Vio',
				address: {
					street: 'Teststreet 4',
					zipCode: 763828,
					country: 'Italy'
				},
				email: 'testToTest@test.com'
			},
			delivery: 'fastest'
		};
		axios.post('/orders.json', order)
		.then(response => {
			// console.log(response)
			this.props.history.push('/');
			this.setState({ loading: false })
		})
		.catch(error => {
			// console.log(error)
			this.setState({ loading: false })
		})
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
				<input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
				<input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
				<input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
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
