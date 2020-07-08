import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)


  const ings = useSelector(state => {
    return state.brgBld.ingredients
  });

  const tot = useSelector(state => {
    return state.brgBld.totalPrice
  });

  const err = useSelector(state => {
    return state.brgBld.error
  });

  const isAuth = useSelector(state => {
    return state.auth.token !== null
  });


  const dispatch = useDispatch()

  const onIngredientAdded = ingName =>
    dispatch(actions.addIngredient(ingName));

  const onIngredientRemoved = ingName =>
    dispatch(actions.removeIngredient(ingName));

  const onInitIngredients = useCallback(() =>
    dispatch(actions.initIngredients()), [dispatch]);

  const onInit = () =>
    dispatch(actions.purchaseInit());

  const onSetAuthRedirectPath = path =>
    dispatch(actions.setAuthRedirectPath(path));


  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients])


  const updatePurchasedState = ingredients => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuth) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInit();
    props.history.push('/checkout');
  };

  const disableInfo = {
    ...ings
  };

  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = err
    ? <p style={{ 'textAlign': 'center' }}>Ingredients can't be loaded!</p>
    : <Spinner/>;

  if (ings) {
    burger =
      (
        <Auxiliary>
          <Burger ingredients={ings}/>,
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disableInfo={disableInfo}
            price={tot}
            ordered={purchaseHandler}
            purchasable={updatePurchasedState(ings)}
            isAuth={isAuth}/>
        </Auxiliary>
      );

    orderSummary = <OrderSummary
      ingredients={ings}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={tot}/>;
  }

  return (
    <Auxiliary>
      <Modal
        show={purchasing} closeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
}

export default withErrorHandler(BurgerBuilder, axios);
