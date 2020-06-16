import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';


class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildBrg && this.props.redPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangeHandler = (event, controlName) => {

    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });

    // const updatedControls = {
    //   ...this.state.controls,
    //   [controlName]: {
    //     ...this.state.controls[controlName],
    //     value: event.target.value,
    //     valid: Auth.checkValidity(
    //       event.target.value,
    //       this.state.controls[controlName].validation
    //     ),
    //     touched: true
    //   }
    // };

    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.state.controls.email.valid && this.state.controls.email.valid) {
      this.props.onAuthentication(
        this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp);
    }
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };


  render() {
    let formElementsArray = [];

    for (const controlName in this.state.controls) {
      if (this.state.controls.hasOwnProperty(controlName)) {
        formElementsArray.push(
          {
            id: controlName,
            config: this.state.controls[controlName]
          }
        );
      }
    }

    let form = (
      formElementsArray.map(formElement => (
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
      ))
    );

    if (this.props.load) {
      form = <Spinner/>;
    }

    let errorMessage = null;
    if (this.props.err) {
      errorMessage = <p>{this.props.err.response.data.error.message}</p>;
    }

    let redirectAuth = null;
    if (this.props.isAuth) {
      redirectAuth = <Redirect to={this.props.redPath}/>;
    }

    return (
      <div className={classes.Auth}>
        {redirectAuth}
        {errorMessage}
        <form onSubmit={event => this.onSubmitHandler(event)}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          clicked={this.switchAuthModeHandler}
          btnType="Danger">{this.state.isSignUp ?
          'SWITCH TO SIGN IN' :
          'SWITCH TO SIGN UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    load: state.auth.loading,
    err: state.auth.error,
    isAuth: state.auth.token !== null,
    buildBrg: state.brgBld.building,
    redPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /* eslint-disable-next-line */
    onAuthentication: (email, password, isSignUp) => dispatch(actions.authentication(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
