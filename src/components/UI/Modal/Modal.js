import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class modal extends Component {
	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return nextProps.show !== this.props.show
	}

	render(){
		return(
			<Auxiliary>
				<Backdrop show={this.props.show} clicked={this.props.closeModal}/>
				<div
					className={classes.Modal}
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}>
					{this.props.children}
				</div>
			</Auxiliary>
		)
	}
}

modal.propTypes = {
	show: PropTypes.bool
};

export default modal;
