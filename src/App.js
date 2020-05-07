import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
	// state = {
	// 	show: true
	// };
	//
	// componentDidMount() {
	// 	setTimeout(() => {
	// 		this.setState({ show: false })
	// 	}, 3000)
	// }

	render() {
		return (
			<div>
				<Layout>
					<Route path="/" exact component={ BurgerBuilder } />
					{/*<BurgerBuilder/>*/}
					{/*{this.state.show ? <BurgerBuilder/> : null}*/}
					<Route path="/checkout" component={ Checkout } />
					{/*<Checkout/>*/}
				</Layout>
			</div>
		);
	}
}

export default App;
