import React from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
	return (
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.closeModal}/>
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
				{props.children}
			</div>
		</Auxiliary>
	);
};

modal.propTypes = {
	show: PropTypes.bool
};

export default modal;

