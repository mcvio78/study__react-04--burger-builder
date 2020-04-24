import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	};

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
		this.setState( { purchasing: false })
	};

	purchaseContinueHandler = () => {
		alert('You continue!')
	};

	render() {

		const disableInfo = {
			...this.state.ingredients
		};

		for (let key in disableInfo) {
			disableInfo[key] = disableInfo[key] <= 0
		}

		return (
			<Auxiliary>
				<Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancelled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler}
						price={this.state.totalPrice}/>
				</Modal>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disableInfo={disableInfo}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
					purchasable={this.state.purchasable}/>
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;
