import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		axios.get('/orders.json')
		.then(res => {

			const fetchOrders = [];
			for (let key in res.data) {
				if (res.data.hasOwnProperty(key)) {
					fetchOrders.push({ ...res.data[key], id: key })
				}
			}
			this.setState({ loading: false, orders: fetchOrders })
		})
		.catch(() => {
			this.setState({ loading: false })
		})
	};

	render() {
		let orders = (<Spinner/>);
		if (!this.state.loading) {
			orders = this.state.orders.map(order => (
				<Order ingredients={order.ingredients} price={+order.price}/>
			))
		}

		return (
			<div>
				{orders}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);

