import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios.get('https://mcburgerbuilder.firebaseio.com/ingredients.json')
		.then(response => {
			this.setState({ ingredients: response.data })
		})
		.catch(() => {
			this.setState({error: true})
		});
	}

	updatePurchasedState = (ingredients) => {
		// const ingredients = {
		// 	...this.state.ingredients
		// };
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey]
		}).reduce((sum, el) => {
			return sum + el
		}, 0);

		this.setState(
			{ purchasable: sum > 0 }
		)
	};

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updateCount = oldCount + 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;

		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = priceAddition + oldPrice;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
		this.updatePurchasedState(updatedIngredients);
	};

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updateCount = oldCount - 1;
		const updatedIngredients = { ...this.state.ingredients };
		updatedIngredients[type] = updateCount;

		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;

		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
		this.updatePurchasedState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	};

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')

		// this.setState({ loading: true });
		//
		// // alert('You continue!')
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customer: {
		// 		name: 'Mauro Vio',
		// 		address: {
		// 			street: 'Teststreet 4',
		// 			zipCode: 763828,
		// 			country: 'Italy'
		// 		},
		// 		email: 'testToTest@test.com'
		// 	},
		// 	delivery: 'fastest'
		// };
		// axios.post('/orders.json', order)
		// .then(response => {
		// 	// console.log(response)
		// 	this.setState({ loading: false, purchasing: false })
		// })
		// .catch(error => {
		// 	// console.log(error)
		// 	this.setState({ loading: false, purchasing: false })
		// })
	};

	render() {
		const disableInfo = {
			...this.state.ingredients
		};

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}

		let orderSummary = null;

		let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

		if (this.state.ingredients) {
			burger =
				(
					<Auxiliary>
						<Burger ingredients={this.state.ingredients}/>,
						<BuildControls
							ingredientAdded={this.addIngredientHandler}
							ingredientRemoved={this.removeIngredientHandler}
							disableInfo={disableInfo}
							price={this.state.totalPrice}
							ordered={this.purchaseHandler}
							purchasable={this.state.purchasable}/>
					</Auxiliary>
				);

			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
				price={this.state.totalPrice}/>;
		}

		if (this.state.loading) {
			orderSummary = <Spinner/>
		}


		return (
			<Auxiliary>
				<Modal
					show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
