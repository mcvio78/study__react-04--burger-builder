import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>Current price is: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
      <BuildControl
        key={control['label']}
        label={control['label']}
        // added={props.ingredientAdded.bind(this, control.type)}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disableButton={props.disableInfo[control.type]}/>
    )
    )}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>
      {props.isAuth
        ? 'ORDER NOW'
        : 'PLEASE AUTHENTICATE'
      }
    </button>
  </div>
);

export default buildControls;
