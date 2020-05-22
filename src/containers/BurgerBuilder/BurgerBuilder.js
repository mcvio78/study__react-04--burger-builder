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
    // axios.get('https://mcburgerbuilder.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(() => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchasedState = ingredients => {
    // const ingredients = {
    //   ...this.state.ingredients
    // };
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState(
      { purchasable: sum > 0 }
    );
  };

  addIngredientHandler = type => {
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

  removeIngredientHandler = type => {
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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    //this.props.history.push(
    // `/checkout?meat=${
    // this.state.ingredients.meat
    // }&cheese=${
    // this.state.ingredients.cheese
    // }&bacon=${
    // this.state.ingredients.bacon
    // }&salad=${
    // this.state.ingredients.salad
    // }`)
    let queryParams = [];
    for (let ingredient in this.state.ingredients) {
      if (this.state.ingredients.hasOwnProperty(ingredient)) { /* eslint-disable-line */
        queryParams.push(
          encodeURIComponent(ingredient) + '=' +
          encodeURIComponent(this.state.ingredients[ingredient]));
      }
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push(
      {
        pathname: '/checkout',
        search: '?' + queryString
      }
    );
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ?
      <p>Ingredients can`&apos`t be loaded!</p> : <Spinner/>;

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
      orderSummary = <Spinner/>;
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
