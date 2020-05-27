import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionCreators from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  // componentDidMount() {
  //   axios.get('https://mcburgerbuilder.firebaseio.com/ingredients.json')
  //     .then(response => {
  //       this.setState({ ingredients: response.data });
  //     })
  //     .catch(() => {
  //       this.setState({ error: true });
  //     });
  // }

  updatePurchasedState = ingredients => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disableInfo = {
      ...this.props.ings
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ?
      <p>Ingredients can`&apos`t be loaded!</p> : <Spinner/>;

    if (this.props.ings) {
      burger =
        (
          <Auxiliary>
            <Burger ingredients={this.props.ings}/>,
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disableInfo={disableInfo}
              price={this.props.tot}
              ordered={this.purchaseHandler}
              purchasable={this.updatePurchasedState(this.props.ings)}/>
          </Auxiliary>
        );

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.tot}/>;
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

const mapStateToProps = state => {
  return {
    ings: state.brgBld.ingredients,
    tot: state.brgBld.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actionCreators.removeIngredient(ingName))
  };
};
// eslint-disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
