import React from 'react';

import classes from './DrawerToggle.module.scss';

const drawerToggle = props => (
  <div
    className={classes.DrawerToggle}
    onClick={props.clicked}
    role="button"
    tabIndex={0}
    onKeyDown={props.clicked}
  >
    <div />
    <div />
    <div />
  </div>
);

export default drawerToggle;
