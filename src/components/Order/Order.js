import React from 'react';

import classes from './Order.module.css';

const order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredientName)) { /* eslint-disable-line */
      ingredients.push(
        {
          name: ingredientName,
          amount: props.ingredients[ingredientName]
        }
      );
    }
  }

  const ingredientOut = ingredients.map(ing => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #CCC',
          padding: '5px'
        }}
        key={ing.name}>{ing.name}({ing.amount})</span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOut}</p>

      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  );
};

export default order;
