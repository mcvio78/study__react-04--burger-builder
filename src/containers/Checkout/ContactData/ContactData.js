import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler.js';
import * as actions from '../../../store/actions/index';

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
        value: 'fastest',
        validation: {},
        valid: true
      }
    },
    formIsValid: false
    // loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    // this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) { /* eslint-disable-line */
        formData[formElementIdentifier] =
          this.state.orderForm[formElementIdentifier]['value'];
      }
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.tot,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  };

  static checkValidity(value, rules) {          // Static method
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
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

    updatedElement.valid =
      ContactData.checkValidity(
        updatedElement.value,
        updatedElement.validation
      );

    updatedElement.touched = true;

    updatedForm[id] = updatedElement;

    let formIsValid = true;
    for (const inputIdentifiers in updatedForm) {
      if (updatedForm.hasOwnProperty(inputIdentifiers)) {/*eslint-disable-line*/
        formIsValid = updatedForm[inputIdentifiers].valid && formIsValid;
      }
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    let formElementsArray = [];

    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) { /* eslint-disable-line */
        formElementsArray.push(
          {
            id: key,
            config: this.state.orderForm[key]
          }
        );
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
            fieldName={formElement.id}
            notValid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => this.inputChangeHandler(event, formElement.id)}/>
        )
        )}
        <Button
          btnType="Success"
          disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner/>;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    tot: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: dispatch(orderData => actions.purchaseBurgerStart(orderData))
  };
};
// eslint-disable-next-line
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));
