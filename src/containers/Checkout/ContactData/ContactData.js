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
		let formElementsArray = [];

		for (const key in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(key)) {
				console.log(key);
				formElementsArray.push(
					{
						id: key,
						config: this.state.orderForm[key],
					}
				)
			}
		}

		let form = (
			<form>
				{formElementsArray.map(formElement => (
					<Input
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						key={formElement.id}/>
					)
				)}

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
