import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.scss';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Mail Address',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignUp, setIsSignUp] = useState(true);
  const { buildBrg, redPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildBrg && redPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildBrg, redPath, onSetAuthRedirectPath]);

  const inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation,
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    if (controls.email.valid && controls.email.valid) {
      props.onAuthentication(
        controls.email.value,
        controls.password.value,
        isSignUp,
      );
    }
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSignUp);
  };

  const formElementsArray = [];
  Object.keys(controls).forEach(controlName => formElementsArray.push(
    {
      id: controlName,
      config: controls[controlName],
    },
  ));

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
        changed={event => inputChangeHandler(event, formElement.id)} />
    ))
  );

  if (props.load) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.err) {
    errorMessage = <p>{props.err.response.data.error.message}</p>;
  }

  let redirectAuth = null;
  if (props.isAuth) {
    redirectAuth = <Redirect to={props.redPath} />;
  }

  return (
    <div className={classes.Auth}>
      {redirectAuth}
      {errorMessage}
      <form onSubmit={event => onSubmitHandler(event)}>
        {form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button
        clicked={switchAuthModeHandler}
        btnType="Danger">{isSignUp
          ? 'SWITCH TO SIGN IN'
          : 'SWITCH TO SIGN UP'}</Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    load: state.auth.loading,
    err: state.auth.error,
    isAuth: state.auth.token !== null,
    buildBrg: state.brgBld.building,
    redPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthentication: (email, password, isSignUp) =>
      dispatch(actions.authentication(email, password, isSignUp)), /* eslint-disable-line */
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
