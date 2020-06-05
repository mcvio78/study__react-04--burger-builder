import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  // conditional CSS
  let attachedClasses;

  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  } else {
    attachedClasses = [classes.SideDrawer, classes.Close];
  }

  return (
    <Auxiliary>
      <Backdrop
        clicked={props.closed}
        show={props.open}/>
      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Auxiliary>
  );
};

export default sideDrawer;
