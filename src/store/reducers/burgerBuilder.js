import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
/* eslint-disable */
const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const stateUpdatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, stateUpdatedProperties);
    }

    case actionTypes.REMOVE_INGREDIENT: {
      const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const stateUpdatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
      return updateObject(state, stateUpdatedProperties);
    }
    /* eslint-enable */

    case actionTypes.SET_INGREDIENTS: {
      const initIngredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
      };
      const updatedIngredients = updateObject(state.ingredients, initIngredients); // eslint-disable-line
      const stateUpdatedProperties = {
        ingredients: updatedIngredients,
        error: false,
        totalPrice: 4
      };
      return updateObject(state, stateUpdatedProperties);
    }

    case actionTypes.FETCH_INGREDIENTS_FAILED: {
      const stateUpdatedProperties = {
        error: true
      };
      return updateObject(state, stateUpdatedProperties);
    }

    default:
      return state;
  }
};

export default burgerBuilderReducer;
