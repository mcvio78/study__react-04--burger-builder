import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
	// conditional CSS
	let attachedClasses = [classes.SideDrawer, classes.Close];

	if(props.open){
		attachedClasses = [classes.SideDrawer, classes.Open]
	} else {
		attachedClasses = [classes.SideDrawer, classes.Close]
	}

	return (
		<Auxiliary>
			<Backdrop
				clicked={props.closed}
				show={props.open}/>
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo/>
				</div>
				<nav>
					<NavigationItems/>
				</nav>
			</div>
		</Auxiliary>
	)
};

export default sideDrawer;
