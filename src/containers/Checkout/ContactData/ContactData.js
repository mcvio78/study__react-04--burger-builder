// import React, { Component } from 'react';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler
  from '../../../hoc/withErrorHandler/withErrorHandler.js';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

// class ContactData extends Component {
//   state = {
//     orderForm: {
//       name: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Your Name'
//         },
//         value: '',
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       street: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Street'
//         },
//         value: '',
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       zipCode: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Zip Code'
//         },
//         value: '',
//         validation: {
//           required: true,
//           minLength: 5,
//           maxLength: 5
//         },
//         valid: false,
//         touched: false
//       },
//       country: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'text',
//           placeholder: 'Country'
//         },
//         value: '',
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       email: {
//         elementType: 'input',
//         elementConfig: {
//           type: 'email',
//           placeholder: 'Your E-Mail'
//         },
//         value: '',
//         validation: {
//           required: true
//         },
//         valid: false,
//         touched: false
//       },
//       delivery: {
//         elementType: 'select',
//         elementConfig: {
//           options: [
//             { value: 'fastest', displayValue: 'Fastest' },
//             { value: 'cheapest', displayValue: 'Cheapest' }
//           ]
//         },
//         value: 'fastest',
//         validation: {},
//         valid: true
//       }
//     },
//     formIsValid: false
//   };
//
//   orderHandler = event => {
//     event.preventDefault();
//
//     const formData = {};
//     for (let formElementIdentifier in this.state.orderForm) {
//       if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) { /* eslint-disable-line */
//         formData[formElementIdentifier] =
//           this.state.orderForm[formElementIdentifier]['value'];
//       }
//     }
//
//     const order = {
//       ingredients: this.props.ings,
//       price: this.props.tot,
//       orderData: formData,
//       userId: this.props.uId
//     };
//
//     this.props.onOrderBurger(order, this.props.tkn);
//   };
//
//   inputChangeHandler = (event, id) => {
//     const updatedElement = updateObject(this.state.orderForm[id], {
//       value: event.target.value,
//       valid: checkValidity(
//         event.target.value,
//         this.state.orderForm[id].validation
//       ),
//       touched: true
//     });
//
//     const updatedForm = updateObject(this.state.orderForm, {
//       [id]: updatedElement
//     });
//
//
//     // const updatedForm = {
//     //   ...this.state.orderForm
//     // };
//     // const updatedElement = {
//     //   ...updatedForm[id]
//     // };
//     //
//     // updatedElement.value = event.target.value;
//     //
//     // updatedElement.valid =
//     //   ContactData.checkValidity(
//     //     updatedElement.value,
//     //     updatedElement.validation
//     //   );
//     //
//     // updatedElement.touched = true;
//     //
//     // updatedForm[id] = updatedElement;
//
//     let formIsValid = true;
//     for (const inputIdentifiers in updatedForm) {
//       if (updatedForm.hasOwnProperty(inputIdentifiers)) {
//         formIsValid = updatedForm[inputIdentifiers].valid && formIsValid;
//       }
//     }
//
//     this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
//   };
//
//   render() {
//     let formElementsArray = [];
//
//     for (const key in this.state.orderForm) {
//       if (this.state.orderForm.hasOwnProperty(key)) { /* eslint-disable-line */
//         formElementsArray.push(
//           {
//             id: key,
//             config: this.state.orderForm[key]
//           }
//         );
//       }
//     }
//
//     let form = (
//       <form onSubmit={this.orderHandler}>
//         {formElementsArray.map(formElement => (
//             <Input
//               elementType={formElement.config.elementType}
//               elementConfig={formElement.config.elementConfig}
//               value={formElement.config.value}
//               key={formElement.id}
//               fieldName={formElement.id}
//               notValid={!formElement.config.valid}
//               shouldValidate={formElement.config.validation}
//               touched={formElement.config.touched}
//               changed={event => this.inputChangeHandler(event, formElement.id)}/>
//           )
//         )}
//         <Button
//           btnType="Success"
//           disabled={!this.state.formIsValid}>Order</Button>
//       </form>
//     );
//     if (this.props.load) {
//       form = <Spinner/>;
//     }
//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter Your Contact Data</h4>
//         {form}
//       </div>
//     );
//   }
// }





const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
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
  })
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in orderForm) {
      if (orderForm.hasOwnProperty(formElementIdentifier)) {
        formData[formElementIdentifier] =
          orderForm[formElementIdentifier]['value'];
      }
    }

    const order = {
      ingredients: props.ings,
      price: props.tot,
      orderData: formData,
      userId: props.uId
    };

    props.onOrderBurger(order, props.tkn);
  };

  const inputChangeHandler = (event, id) => {
    const updatedElement = updateObject(orderForm[id], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[id].validation
      ),
      touched: true
    });

    const updatedForm = updateObject(orderForm, {
      [id]: updatedElement
    });

    let formIsValid = true;
    for (const inputIdentifiers in updatedForm) {
      if (updatedForm.hasOwnProperty(inputIdentifiers)) {
        formIsValid = updatedForm[inputIdentifiers].valid && formIsValid;
      }
    }

    setOrderForm(updatedForm);
    setFormIsValid(formIsValid);
  };

  let formElementsArray = [];

  for (const key in orderForm) {
    if (orderForm.hasOwnProperty(key)) { /* eslint-disable-line */
      formElementsArray.push(
        {
          id: key,
          config: orderForm[key]
        }
      );
    }
  }

  let form = (
    <form onSubmit={orderHandler}>
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
            changed={event => inputChangeHandler(event, formElement.id)}/>
        )
      )}
      <Button
        btnType="Success"
        disabled={!formIsValid}>Order</Button>
    </form>
  );
  if (props.load) {
    form = <Spinner/>;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {form}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ings: state.brgBld.ingredients,
    tot: state.brgBld.totalPrice,
    load: state.ord.loading,
    tkn: state.auth.token,
    uId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))/* eslint-disable-line */
  };
};
// eslint-disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
