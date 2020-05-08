import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {

		state = {
			initialized: false,
			error: null
		};

		// UNSAFE_componentWillMount() {
		// 	this.reqInterceptor = axios.interceptors.request.use(req => {
		// 		this.setState({ error: null });
		// 		return req
		// 	});
		//
		// 	this.resInterceptor = axios.interceptors.response.use(res => res, error => {
		// 		this.setState({ error: error })
		// 	});
		// 	console.log('componentWillMount: ', this.reqInterceptor, this.resInterceptor);
		// }

		componentDidMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req
			});

			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({ error: error })
			});

			this.setState({ initialized: true });
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
			console.log('componentWillUnmount: ', this.reqInterceptor, this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		};

		render() {

			const { initialized } = this.state;
			if (!initialized) return null;

			return (
				<Auxiliary>
					<Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props}/>
				</Auxiliary>
			)
		}
	}
};

export default withErrorHandler;
