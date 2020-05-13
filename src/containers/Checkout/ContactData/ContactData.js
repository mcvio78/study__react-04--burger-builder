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
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
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

		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
				formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier]['value']
			}
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
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

	checkValidity(value, rules) {
		let isValid = true;

		if (rules && rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules && rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules && rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangeHandler = (event, id) => {
		const updatedForm = {
			...this.state.orderForm
		};
		const updatedElement = {
			...updatedForm[id]
		};

		updatedElement.value = event.target.value;

		updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);

		updatedElement.touched = true;

		updatedForm[id] = updatedElement;

		console.log('updatedElement: ', updatedElement);

		this.setState({ orderForm: updatedForm })
	};

	render() {
		let formElementsArray = [];

		for (const key in this.state.orderForm) {
			if (this.state.orderForm.hasOwnProperty(key)) {
				formElementsArray.push(
					{
						id: key,
						config: this.state.orderForm[key],
					}
				)
			}
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
						<Input
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.config.value}
							key={formElement.id}
							notValid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
					)
				)}
				<Button btnType="Success">Order</Button>
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
