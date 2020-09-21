import React from 'react';

import PropTypes from 'prop-types';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span
          style={{
            textTransform: 'capitalize',
          }}>{igKey}: {props.ingredients[igKey]}</span>
      </li>
    );
  });

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.purchaseCancelled}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.purchaseContinued}>CONTINUE</Button>
    </Auxiliary>
  );
};

orderSummary.propTypes = {
  /* eslint-disable */
  clicked: PropTypes.func,
  price: PropTypes.number,
  /* eslint-enable */
};

export default orderSummary;
