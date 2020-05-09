import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

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
					{/*<Checkout/>*/}
					<Route path="/checkout" component={ Checkout } />
					{/*<BurgerBuilder/>*/}
					<Route path="/orders"  component={ Orders } />
					<Route path="/" exact component={ BurgerBuilder } />
					{/*{this.state.show ? <BurgerBuilder/> : null}*/}

				</Layout>
			</div>
		);
	}
}

export default App;
